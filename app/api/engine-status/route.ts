import { NextRequest, NextResponse } from 'next/server';
import { getEngineStatus } from '@/lib/gemini';
import { ApiResponse, EngineStatus } from '@/types';

export async function GET(req: NextRequest) {
  const customKey = req.headers.get('x-gemini-key') || req.nextUrl.searchParams.get('apiKey') || undefined;
  const status = getEngineStatus(customKey);
  return NextResponse.json<ApiResponse<EngineStatus>>({
    success: true,
    data: status,
    engineUsed: status.activeEngine,
  });
}
