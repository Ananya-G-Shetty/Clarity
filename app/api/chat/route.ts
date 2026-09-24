import { NextRequest, NextResponse } from 'next/server';
import { answerQuestionGrounded } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';
import { ApiResponse, Citation } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`chat:${ip}`, { maxRequests: 50 });
    if (!rateCheck.allowed) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Chat rate limit reached. Please pause before sending another question.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { question, documentText, docTitle, apiKey } = body;
    const customKey = req.headers.get('x-gemini-key') || apiKey;

    if (!question || typeof question !== 'string' || !documentText) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Both question and document context are required for grounded Q&A.' },
        { status: 400 }
      );
    }

    const result = await answerQuestionGrounded(
      question,
      documentText,
      docTitle || 'Current Document',
      customKey
    );

    return NextResponse.json<
      ApiResponse<{
        answer: string;
        citations: Citation[];
        notFoundInDoc: boolean;
      }>
    >({
      success: true,
      data: {
        answer: result.answer,
        citations: result.citations,
        notFoundInDoc: result.notFoundInDoc,
      },
      engineUsed: result.engineUsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error occurred during chat response generation.';
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
