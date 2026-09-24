import { chunkDocument, retrieveRelevantSections } from '@/lib/rag';
import { SAMPLE_RENTAL_SUMMARY, SAMPLE_OFFER_SUMMARY } from '@/lib/sample-docs';

describe('Risk Scoring & RAG Unit Tests', () => {
  it('correctly aggregates risk breakdown categories for sample rental lease', () => {
    const { riskBreakdown, clauses } = SAMPLE_RENTAL_SUMMARY;
    const actualRedFlags = clauses.filter((c) => c.riskLevel === 'red_flag').length;
    const actualReview = clauses.filter((c) => c.riskLevel === 'review').length;
    const actualStandard = clauses.filter((c) => c.riskLevel === 'standard').length;

    expect(riskBreakdown.redFlag).toBe(actualRedFlags);
    expect(riskBreakdown.review).toBe(actualReview);
    expect(riskBreakdown.standard).toBe(actualStandard);
  });

  it('correctly aggregates risk breakdown categories for sample offer letter', () => {
    const { riskBreakdown, clauses } = SAMPLE_OFFER_SUMMARY;
    const actualRedFlags = clauses.filter((c) => c.riskLevel === 'red_flag').length;
    expect(riskBreakdown.redFlag).toBe(actualRedFlags);
  });

  it('chunkDocument properly splits contracts by sections', () => {
    const sample = `1. Term\nThis is the term.\n\n2. Rent\nRent is payable monthly.\n\n3. Deposit\nDeposit is refundable.`;
    const chunks = chunkDocument(sample);
    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(chunks[0].content).toContain('Term');
  });

  it('retrieveRelevantSections identifies top matching sections for query keywords', () => {
    const sample = `1. Security Deposit\nThe deposit is 250000 rupees.\n\n2. Maintenance\nTenant handles routine repairs.\n\n3. Entry Notice\nLandlord provides 12 hours notice.`;
    const chunks = chunkDocument(sample);
    const relevant = retrieveRelevantSections('How much is the deposit?', chunks, 1);
    expect(relevant.length).toBe(1);
    expect(relevant[0].content).toContain('Security Deposit');
  });
});
