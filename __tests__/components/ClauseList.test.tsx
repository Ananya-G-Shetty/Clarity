import React from 'react';
import { render, screen } from '@testing-library/react';
import { ClauseCard } from '@/components/ClauseCard';
import { ClauseAnalysis } from '@/types';

const mockRedFlagClause: ClauseAnalysis = {
  id: 'test-1',
  clauseNumber: '2',
  title: 'Security Deposit Withholding',
  category: 'Deposit / Refund',
  originalClause: 'Landlord may withhold deposit for 90 days without receipts.',
  plainLanguageSummary: 'The landlord can keep your money for 3 months with no bills.',
  riskLevel: 'red_flag',
  riskReason: 'This is unusual vs. standard practice and may be worth asking a lawyer about.',
  recommendations: 'Demand 15-day return timeline.',
};

describe('ClauseCard & RiskBadge Component Tests', () => {
  it('renders clause title, category, and plain language summary', () => {
    render(<ClauseCard clause={mockRedFlagClause} />);
    expect(screen.getByText('Security Deposit Withholding')).toBeInTheDocument();
    expect(screen.getByText('Category: Deposit / Refund')).toBeInTheDocument();
    expect(screen.getByText(/The landlord can keep your money/i)).toBeInTheDocument();
  });

  it('renders color-coded badge paired with explicit textual label and ARIA attributes', () => {
    render(<ClauseCard clause={mockRedFlagClause} />);
    const badge = screen.getByRole('status', { name: /Risk Level: Potential Red Flag/i });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Potential Red Flag');
  });

  it('includes expandable details with accessible aria-expanded attribute', () => {
    render(<ClauseCard clause={mockRedFlagClause} />);
    const toggleBtn = screen.getByTitle(/Expand clause details/i);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
