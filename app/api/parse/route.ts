import { NextRequest, NextResponse } from 'next/server';
import { validateUploadedFile, extractTextFromBuffer, sanitizeDocumentText } from '@/lib/parser';
import { checkRateLimit } from '@/lib/rate-limit';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`parse:${ip}`, { maxRequests: 20 });
    if (!rateCheck.allowed) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Too many upload requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'No file provided in the upload request.' },
        { status: 400 }
      );
    }

    const validation = validateUploadedFile(file.name, file.type, file.size);
    if (!validation.valid) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: validation.error || 'Invalid file format or size.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const rawExtracted = await extractTextFromBuffer(buffer, file.name, file.type);
    const sanitizedText = sanitizeDocumentText(rawExtracted);

    if (!sanitizedText || sanitizedText.length < 15) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: 'Unable to extract legible text from this file. The document may be empty, corrupted, or password-protected.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json<ApiResponse<{ text: string; filename: string; size: number }>>({
      success: true,
      data: {
        text: sanitizedText,
        filename: file.name,
        size: file.size,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected server error occurred during parsing.';
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
