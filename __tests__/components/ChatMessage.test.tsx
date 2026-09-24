import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatWidget } from '@/components/ChatWidget';

describe('ChatWidget Component Tests', () => {
  it('renders welcome message and input field with accessible label', () => {
    render(
      <ChatWidget
        documentText="Sample Lease Agreement Text"
        docTitle="Sample Rental Agreement"
        suggestedQuestions={['Can the landlord withhold deposit?']}
      />
    );

    expect(screen.getByText(/Strict Document-Grounded Q&A/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask anything about Sample Rental Agreement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ask a question about the document/i)).toBeInTheDocument();
  });

  it('renders suggested question prompt chips', () => {
    render(
      <ChatWidget
        documentText="Sample Lease Agreement Text"
        docTitle="Sample Rental Agreement"
        suggestedQuestions={['Can the landlord withhold deposit?']}
      />
    );

    expect(screen.getByText('Can the landlord withhold deposit?')).toBeInTheDocument();
  });
});
