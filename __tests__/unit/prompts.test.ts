import {
  buildSummarizePrompt,
  buildComparePrompt,
  buildChatGroundingPrompt,
  buildChecklistPrompt,
  SYSTEM_LEGAL_SAFETY_DIRECTIVE,
} from '@/lib/prompts';

describe('Prompt Construction & Safety Directives Unit Tests', () => {
  it('enforces non-definitive legal advice safety directive in system prompt', () => {
    expect(SYSTEM_LEGAL_SAFETY_DIRECTIVE).toContain('NEVER give definitive legal advice');
    expect(SYSTEM_LEGAL_SAFETY_DIRECTIVE).toContain('unusual vs. standard practice and may be worth asking a lawyer about');
  });

  it('buildSummarizePrompt incorporates jurisdiction and JSON schema requirements', () => {
    const prompt = buildSummarizePrompt('Sample Lease Text', 'India');
    expect(prompt).toContain('JURISDICTION CONTEXT: India');
    expect(prompt).toContain('executiveSummary');
    expect(prompt).toContain('riskLevel');
    expect(prompt).toContain('Sample Lease Text');
  });

  it('buildComparePrompt specifies conceptual semantic comparison, not text-diff', () => {
    const prompt = buildComparePrompt('Doc A Text', 'Doc B Text', 'Contract 1', 'Contract 2');
    expect(prompt).toContain('Do NOT perform a character-level or text-diff comparison');
    expect(prompt).toContain('favorabilityWinner');
    expect(prompt).toContain('Contract 1');
    expect(prompt).toContain('Contract 2');
  });

  it('buildChatGroundingPrompt mandates citation and explicit "not found" fallback', () => {
    const prompt = buildChatGroundingPrompt('Does this lease allow pets?', 'No pets allowed in building');
    expect(prompt).toContain('notFoundInDoc');
    expect(prompt).toContain('This topic is not found in the uploaded document');
    expect(prompt).toContain('citations');
  });

  it('buildChecklistPrompt structures output into checklist items and lawyer questions', () => {
    const prompt = buildChecklistPrompt('Summary of risks');
    expect(prompt).toContain('checklist');
    expect(prompt).toContain('lawyerQuestions');
  });
});
