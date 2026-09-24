import React from 'react';
import { render, screen } from '@testing-library/react';
import { CompareView } from '@/components/CompareView';
import { SAMPLE_COMPARISON_RESULT } from '@/lib/sample-docs';

describe('CompareView Component Tests', () => {
  it('renders semantic comparison table with proper table headers and caption', () => {
    render(<CompareView initialComparison={SAMPLE_COMPARISON_RESULT} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Clause Category & Title')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sample Rental Agreement' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sample Offer Letter' })).toBeInTheDocument();
    expect(screen.getByText('Favorability & Analysis')).toBeInTheDocument();
  });

  it('renders side-by-side rows with favorability winner badges', () => {
    render(<CompareView initialComparison={SAMPLE_COMPARISON_RESULT} />);

    expect(screen.getByText('Exit & Termination Penalties')).toBeInTheDocument();
    expect(screen.getByText('Freedom of Movement & Privacy')).toBeInTheDocument();

    const neutralBadges = screen.getAllByText(/Neutral \/ Similar Risk/i);
    expect(neutralBadges.length).toBeGreaterThan(0);
  });
});
