import { NextRequest, NextResponse } from 'next/server';
import { generateChecklistAndQuestions } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';
import { ApiResponse, ChecklistItem, LawyerQuestion, DocumentSummary } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`checklist:${ip}`, { maxRequests: 30 });
    if (!rateCheck.allowed) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Checklist rate limit reached. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const summary = body.summary || body as DocumentSummary;
    const customKey = req.headers.get('x-gemini-key') || body.apiKey;

    if (!summary || !summary.clauses) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Document summary with clauses is required to generate pre-signing checklist.' },
        { status: 400 }
      );
    }

    const { checklist, lawyerQuestions, engineUsed } = await generateChecklistAndQuestions(summary, customKey);

    return NextResponse.json<
      ApiResponse<{
        checklist: ChecklistItem[];
        lawyerQuestions: LawyerQuestion[];
      }>
    >({
      success: true,
      data: {
        checklist,
        lawyerQuestions,
      },
      engineUsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error occurred during checklist generation.';
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
