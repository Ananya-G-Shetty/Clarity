import { LegalGlossaryTerm } from '@/types';

export const STATIC_LEGAL_GLOSSARY: Record<string, LegalGlossaryTerm> = {
  indemnity: {
    term: 'Indemnity',
    definition: 'A promise where one party agrees to pay for the financial losses or legal damages incurred by the other party.',
    plainEnglishExample: 'If a visitor sues the landlord because of your pet, an indemnity clause might make you pay the landlord’s legal bills.',
  },
  'force majeure': {
    term: 'Force Majeure',
    definition: 'A clause that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control occurs (like natural disasters or wars).',
    plainEnglishExample: 'If an earthquake makes the apartment uninhabitable, this clause allows you to terminate without penalty.',
  },
  'liquidated damages': {
    term: 'Liquidated Damages',
    definition: 'A predetermined sum that must be paid as compensation if one party breaches a specific term of the agreement.',
    plainEnglishExample: 'If you break the lease early, paying a flat 2-month rent fee is a liquidated damages arrangement.',
  },
  severability: {
    term: 'Severability',
    definition: 'A provision stating that if one part of the contract is found invalid or unenforceable by a court, the remainder of the contract remains in effect.',
    plainEnglishExample: 'If one unfair penalty clause is ruled illegal, the rest of the lease contract still stands.',
  },
  'non-compete': {
    term: 'Non-Compete',
    definition: 'A clause restricting an employee or contractor from working with or establishing a competing business for a specific time and geographic area.',
    plainEnglishExample: 'A rule preventing you from joining a rival software company within 12 months after leaving your current job.',
  },
  arbitration: {
    term: 'Arbitration',
    definition: 'A private dispute resolution process where a neutral arbitrator makes a legally binding decision instead of going to a public court of law.',
    plainEnglishExample: 'Instead of suing in small claims court, you and the landlord must resolve disagreements before a private arbitrator.',
  },
  'lock-in period': {
    term: 'Lock-in Period',
    definition: 'A minimum committed duration during which neither party can terminate the agreement without paying hefty termination penalties or remaining dues.',
    plainEnglishExample: 'In a 6-month lock-in rental lease, vacating at month 3 requires paying rent for months 4, 5, and 6.',
  },
  'intellectual property assignment': {
    term: 'Intellectual Property Assignment',
    definition: 'A clause transferring ownership of all inventions, code, designs, or writings created during employment to the employer.',
    plainEnglishExample: 'Any software feature or patent you conceive while employed automatically belongs entirely to the company.',
  },
  'entire agreement': {
    term: 'Entire Agreement (Merger Clause)',
    definition: 'A clause declaring that the written document contains the complete and final agreement, superseding any prior verbal discussions or emails.',
    plainEnglishExample: 'Even if the hiring manager promised bonus pay verbally, if it is not written into this contract, you cannot enforce it.',
  },
  clawback: {
    term: 'Clawback',
    definition: 'A provision requiring an employee to return money or benefits (like a joining bonus or relocation stipend) if certain conditions are not met.',
    plainEnglishExample: 'If you resign within 12 months, you must refund your $5,000 joining bonus.',
  },
  'governing law': {
    term: 'Governing Law',
    definition: 'The specific state or country jurisdiction whose laws will be used to interpret the contract and resolve disputes.',
    plainEnglishExample: 'If your contract states "Laws of England and Wales", any lawsuit must follow British legal principles.',
  },
  'joint and several liability': {
    term: 'Joint and Several Liability',
    definition: 'A condition where multiple parties are collectively and individually responsible for the entire obligation.',
    plainEnglishExample: 'If your roommate stops paying their share of the rent, the landlord can legally demand 100% of the rent from you alone.',
  },
  confidentiality: {
    term: 'Confidentiality (NDA)',
    definition: 'An obligation to protect sensitive business, technical, or financial information from unauthorized disclosure.',
    plainEnglishExample: 'You cannot share customer lists, trade secrets, or unreleased product roadmaps with third parties.',
  },
  'at-will employment': {
    term: 'At-Will Employment',
    definition: 'An employment arrangement where either employer or employee can end the employment relationship at any time for any legal reason or no reason.',
    plainEnglishExample: 'You can resign anytime with zero notice, but the employer can also terminate you at any moment without severance.',
  },
  'right of entry': {
    term: 'Right of Entry',
    definition: 'The terms and advance notice under which a landlord may inspect or enter the leased premises.',
    plainEnglishExample: 'The requirement that the landlord provide at least 24 hours written notice before entering for non-emergency inspections.',
  },
};

/**
 * Normalizes term and returns static explanation or falls back
 */
export function getGlossaryDefinition(term: string): LegalGlossaryTerm | null {
  const normalized = term.trim().toLowerCase();
  if (STATIC_LEGAL_GLOSSARY[normalized]) {
    return STATIC_LEGAL_GLOSSARY[normalized];
  }
  // Try partial matching
  for (const [key, val] of Object.entries(STATIC_LEGAL_GLOSSARY)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }
  return null;
}
