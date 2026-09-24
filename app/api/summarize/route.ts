import { NextRequest, NextResponse } from 'next/server';
import { summarizeDocument } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';
import { ApiResponse, DocumentSummary } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`summarize:${ip}`, { maxRequests: 35 });
    if (!rateCheck.allowed) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Rate limit reached. Please wait before summarizing another document.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { text, title, jurisdiction, apiKey } = body;
    const customKey = req.headers.get('x-gemini-key') || apiKey;

    if (!text || typeof text !== 'string') {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Missing document text for analysis.' },
        { status: 400 }
      );
    }

    const { summary, engineUsed } = await summarizeDocument(
      text,
      title || 'Uploaded Document',
      jurisdiction || 'India',
      customKey
    );

    return NextResponse.json<ApiResponse<DocumentSummary>>({
      success: true,
      data: summary,
      engineUsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error occurred during summarization.';
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
