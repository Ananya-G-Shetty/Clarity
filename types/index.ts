export type RiskLevel = 'standard' | 'review' | 'red_flag';

export interface ClauseAnalysis {
  id: string;
  clauseNumber?: string;
  title: string;
  originalClause: string;
  plainLanguageSummary: string;
  riskLevel: RiskLevel;
  riskReason: string;
  recommendations: string;
  category: string;
  pageOrSection?: string;
}

export interface DocumentSummary {
  docId: string;
  title: string;
  docType: string;
  jurisdiction: string;
  executiveSummary: string;
  keyObligations: string[];
  financialTerms: string[];
  criticalDeadlines: string[];
  overallRiskScore: 'low' | 'moderate' | 'high';
  riskBreakdown: {
    standard: number;
    review: number;
    redFlag: number;
  };
  clauses: ClauseAnalysis[];
  suggestedQuestions: string[];
  preSigningChecklist?: ChecklistItem[];
}

export interface ComparisonItem {
  category: string;
  clauseTitle: string;
  docAValue: string;
  docBValue: string;
  favorabilityWinner: 'docA' | 'docB' | 'neutral';
  explanation: string;
  potentialRiskNotes?: string;
}

export interface ComparisonResult {
  docAName: string;
  docBName: string;
  executiveComparison: string;
  items: ComparisonItem[];
  overallRecommendation: string;
}

export interface Citation {
  clauseId?: string;
  clauseTitle: string;
  sectionQuote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations: Citation[];
  notFoundInDoc: boolean;
  timestamp: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  explanation: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface LawyerQuestion {
  id: string;
  clauseRef: string;
  question: string;
  context: string;
}

export interface LegalGlossaryTerm {
  term: string;
  definition: string;
  plainEnglishExample: string;
}

export interface EngineStatus {
  activeEngine: 'gemini' | 'local_fallback';
  modelName: string;
  isFallback: boolean;
  details: string;
}

export interface ParsedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  rawText: string;
  uploadedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  engineUsed?: 'gemini' | 'local_fallback';
}
