import { NextRequest, NextResponse } from 'next/server';
import { compareDocuments } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';
import { ApiResponse, ComparisonResult } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`compare:${ip}`, { maxRequests: 25 });
    if (!rateCheck.allowed) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Comparison rate limit reached. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { docAText, docBText, docAName, docBName, apiKey } = body;
    const customKey = req.headers.get('x-gemini-key') || apiKey;

    if (!docAText || !docBText) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Both Document A and Document B text are required for semantic comparison.' },
        { status: 400 }
      );
    }

    const { comparison, engineUsed } = await compareDocuments(
      docAText,
      docBText,
      docAName || 'Document A',
      docBName || 'Document B',
      customKey
    );

    return NextResponse.json<ApiResponse<ComparisonResult>>({
      success: true,
      data: comparison,
      engineUsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error occurred during comparison.';
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
