import { DocumentSummary, ComparisonResult, ChecklistItem, LawyerQuestion } from '@/types';

export const SAMPLE_RENTAL_AGREEMENT_TEXT = `RESIDENTIAL LEASE AND TENANCY AGREEMENT

This Agreement is entered into on January 15, 2026, by and between:
LANDLORD: Apex Property Holdings Ltd. ("Landlord")
TENANT: Priya Sharma ("Tenant")
PREMISES: Apartment 402, Greenfield Residences, Indiranagar, Bengaluru, 560038

1. TERM AND RENT
The Lease shall commence on February 1, 2026, for a duration of 11 months. The monthly rent shall be INR 42,000 (Forty-Two Thousand Only), payable on or before the 5th calendar day of each month via electronic bank transfer. A late penalty fee of INR 1,500 shall be levied for each 7-day delay.

2. SECURITY DEPOSIT & WITHHOLDING TERMS
The Tenant shall deposit a refundable security deposit of INR 2,50,000 (Two Lakh Fifty Thousand Only) upon execution of this agreement. The Landlord reserves the unilateral right to withhold the security deposit for up to 90 business days following vacancy. The Landlord may deduct repair, painting, or administrative fees without presenting itemized vendor receipts. The Tenant hereby waives the right to dispute deposit deductions exceeding 20% of the principal sum.

3. LOCK-IN PERIOD & TERMINATION
Both parties agree to a mandatory Lock-in Period of six (6) months from the commencement date. If the Tenant vacates before the expiry of the Lock-in Period, the entire security deposit shall stand forfeited as liquidated damages. Following the lock-in period, either party may terminate by serving two (2) months' written notice.

4. MAINTENANCE AND REPAIRS
The Tenant shall bear the sole financial responsibility for all internal minor repairs and routine maintenance up to INR 5,000 per occurrence. For major structural repairs exceeding INR 15,000, the Landlord shall take charge provided written notice is furnished within 48 hours of occurrence.

5. RIGHT OF ENTRY & INSPECTION
The Landlord or their authorized agent shall have the right to enter and inspect the premises at any time between 8:00 AM and 8:00 PM upon providing twelve (12) hours verbal notice or digital notification via messaging apps. In cases deemed emergency by the Landlord, immediate entry without notice is permitted.

6. ANNUAL RENT ESCALATION
Upon mutual renewal at the end of the 11-month term, the monthly rent shall automatically escalate by a mandatory minimum of 12% (Twelve Percent), irrespective of prevailing market rates.

7. INDEMNITY AND LIABILITY
The Tenant agrees to indemnify, defend, and hold harmless the Landlord from any and all claims, damages, liabilities, or legal expenses arising out of any accident, damage, or injury occurring inside the leased apartment, regardless of whether caused by third parties or structural building wear.

8. GOVERNING LAW AND DISPUTE RESOLUTION
This agreement shall be governed in accordance with the laws of India. Any disputes arising hereunder shall be referred to sole arbitration appointed exclusively by the Landlord in Bengaluru.
`;

export const SAMPLE_OFFER_LETTER_TEXT = `CONFIDENTIAL EMPLOYMENT OFFER & SERVICE AGREEMENT

Date: January 20, 2026
To: Priya Sharma
Position: Senior Full-Stack Engineer
Company: NovaSphere Technologies India Pvt. Ltd. ("Company")

Dear Priya,

We are pleased to offer you employment on the terms and conditions outlined below.

1. POSITION AND COMPENSATION
Your base salary will be INR 28,00,000 per annum, payable monthly in arrears. You are eligible for a performance bonus of up to 15% based on annual company metrics, distributed at the sole discretion of the Board.

2. SIGNING BONUS & CLAWBACK PROVISION
The Company will pay a one-time joining bonus of INR 3,00,000 in your first payroll cycle. However, if your employment terminates for ANY reason (including voluntary resignation or involuntary termination without cause by the Company) within twenty-four (24) months of your start date, you must repay the full 100% gross bonus amount within thirty (30) days.

3. AT-WILL EMPLOYMENT & NOTICE PERIOD
Your employment is probationary for the first three (3) months. During probation, either party may terminate the relationship with seven (7) days written notice. Post-probation, the required notice period for the Employee is ninety (90) days. The Company reserves the unilateral right to terminate employment immediately by paying base salary in lieu of notice, with no severance or equity vesting.

4. INTELLECTUAL PROPERTY ASSIGNMENT
You agree that all inventions, software code, algorithms, documentation, designs, and derivative works created by you during your employment—including any projects conceived outside working hours, on personal computers, or on weekends that relate directly or indirectly to the Company's current or prospective business—shall be the sole and exclusive intellectual property of the Company worldwide in perpetuity.

5. NON-COMPETE & NON-SOLICITATION COVENANTS
During your employment and for a period of eighteen (18) months following separation, you shall not, directly or indirectly, engage in, advise, invest in, or work for any company, client, or startup developing cloud-based software or artificial intelligence applications globally. Furthermore, you agree not to solicit or recruit any employee or contractor of the Company for twenty-four (24) months post-departure.

6. CONFIDENTIALITY AND TRADE SECRETS
You shall not disclose any confidential or proprietary information of the Company during or after your employment. All confidential information must remain strictly private indefinitely.

7. DISPUTE RESOLUTION AND JURISDICTION
Any dispute or controversy arising out of this agreement shall be settled through mandatory binding arbitration. The seat of arbitration shall be Bengaluru under the Arbitration and Conciliation Act, with both parties sharing initial arbitration administration fees.
`;

export const SAMPLE_RENTAL_SUMMARY: DocumentSummary = {
  docId: 'sample-rental-agreement',
  title: 'Residential Lease and Tenancy Agreement',
  docType: 'Residential Lease',
  jurisdiction: 'India (Karnataka Rent Framework)',
  executiveSummary:
    'This is a standard 11-month residential lease for an apartment in Indiranagar, Bengaluru. While the base rent (INR 42,000) and lock-in period (6 months) are common, the contract contains severe tenant-unfavorable clauses regarding security deposit withholding (up to 90 days without receipts), 12% mandatory annual escalation, broad indemnification of the landlord for building defects, and a 12-hour right-of-entry provision.',
  keyObligations: [
    'Pay monthly rent of INR 42,000 on or before the 5th of every month.',
    'Remain in premises for at least 6 months (Lock-in Period) under penalty of full deposit forfeiture.',
    'Bear financial cost for minor maintenance and repairs up to INR 5,000 per incident.',
    'Provide 2 months written notice before vacating post-lock-in.',
  ],
  financialTerms: [
    'Monthly Rent: INR 42,000 / month',
    'Late Fee: INR 1,500 for every 7-day delay',
    'Security Deposit: INR 2,50,000 refundable',
    'Mandatory Annual Escalation: 12% on renewal',
  ],
  criticalDeadlines: [
    'Rent due date: 5th of each calendar month',
    'Maintenance notice: within 48 hours of structural defect',
    'Termination notice: 2 months advance notice post-lock-in',
    'Deposit return: within 90 business days of vacancy',
  ],
  overallRiskScore: 'high',
  riskBreakdown: {
    standard: 2,
    review: 3,
    redFlag: 3,
  },
  clauses: [
    {
      id: 'cl-rent-1',
      clauseNumber: '1',
      title: 'Term and Rent Payment',
      category: 'Financial / Payment',
      originalClause:
        'The Lease shall commence on February 1, 2026, for a duration of 11 months. The monthly rent shall be INR 42,000, payable on or before the 5th calendar day of each month. A late penalty fee of INR 1,500 shall be levied for each 7-day delay.',
      plainLanguageSummary:
        'You pay INR 42,000 on the 5th of each month. If you are a week late, you are charged an extra INR 1,500 penalty.',
      riskLevel: 'standard',
      riskReason: 'Payment dates and late penalties are standard practice in Indian residential leases.',
      recommendations: 'Ensure electronic automated transfers to prevent unintentional late fee assessments.',
    },
    {
      id: 'cl-deposit-2',
      clauseNumber: '2',
      title: 'Security Deposit & Withholding Terms',
      category: 'Deposit / Refund',
      originalClause:
        'The Landlord reserves the unilateral right to withhold the security deposit for up to 90 business days following vacancy. The Landlord may deduct repair, painting, or administrative fees without presenting itemized vendor receipts. The Tenant hereby waives the right to dispute deposit deductions exceeding 20% of the principal sum.',
      plainLanguageSummary:
        'The landlord can keep your deposit for 3-4 months after you leave, deduct money without showing receipts or invoices, and you give up your legal right to contest deductions above 20%.',
      riskLevel: 'red_flag',
      riskReason:
        'This is highly unusual vs. standard practice and may be worth asking a lawyer about. Market practice requires deposit return within 15-30 days with verified itemized bills. Waiving the right to dispute deductions severely strips your legal protections.',
      recommendations:
        'Request changing return timeline to 15-30 days upon key handover, require itemized receipts with contractor bills, and strike the dispute waiver.',
    },
    {
      id: 'cl-lockin-3',
      clauseNumber: '3',
      title: 'Lock-in Period & Termination',
      category: 'Term / Exit',
      originalClause:
        'Both parties agree to a mandatory Lock-in Period of six (6) months from the commencement date. If the Tenant vacates before the expiry of the Lock-in Period, the entire security deposit shall stand forfeited as liquidated damages.',
      plainLanguageSummary:
        'You cannot move out during the first 6 months. If your job relocates or you have to leave early, you lose your entire INR 2.5 Lakh deposit.',
      riskLevel: 'review',
      riskReason:
        'Lock-in periods are common, but forfeiting the entire multi-month deposit as liquidated damages even if a replacement tenant is found is disproportionate.',
      recommendations:
        'Propose an early-exit exception for sudden job transfer or medical emergency, or cap forfeiture to 1 month rent rather than full deposit.',
    },
    {
      id: 'cl-repairs-4',
      clauseNumber: '4',
      title: 'Maintenance and Routine Repairs',
      category: 'Property Maintenance',
      originalClause:
        'The Tenant shall bear the sole financial responsibility for all internal minor repairs and routine maintenance up to INR 5,000 per occurrence. For major structural repairs exceeding INR 15,000, the Landlord shall take charge provided written notice is furnished within 48 hours.',
      plainLanguageSummary:
        'You pay for all repairs under INR 5,000 yourself. For big structural issues, if you do not notify the landlord in writing within 48 hours, they might refuse to pay.',
      riskLevel: 'standard',
      riskReason: 'Fairly standard division of minor vs major repairs, though the 48-hour reporting window is strict.',
      recommendations: 'Conduct a thorough move-in inspection with photos/videos to establish pre-existing conditions.',
    },
    {
      id: 'cl-entry-5',
      clauseNumber: '5',
      title: 'Right of Entry & Inspection Notice',
      category: 'Privacy / Tenant Rights',
      originalClause:
        'The Landlord or their authorized agent shall have the right to enter and inspect the premises at any time between 8:00 AM and 8:00 PM upon providing twelve (12) hours verbal notice or digital notification via messaging apps.',
      plainLanguageSummary:
        'The landlord only needs to text you 12 hours ahead to walk through your home between 8 AM and 8 PM.',
      riskLevel: 'review',
      riskReason:
        'Standard lease guidelines typically require at least 24 to 48 hours advance written notice, and inspections should be by mutual scheduling to respect tenant privacy.',
      recommendations: 'Counter with 24 hours advance written notice and entry only when accompanied by tenant.',
    },
    {
      id: 'cl-escalation-6',
      clauseNumber: '6',
      title: 'Mandatory Annual Escalation',
      category: 'Financial Escalation',
      originalClause:
        'Upon mutual renewal at the end of the 11-month term, the monthly rent shall automatically escalate by a mandatory minimum of 12%, irrespective of prevailing market rates.',
      plainLanguageSummary:
        'If you renew the lease next year, your rent goes up by at least 12% automatically, even if local rents have dropped.',
      riskLevel: 'review',
      riskReason:
        'Urban Indian rental escalation usually ranges between 5% and 8% annually. 12% is on the higher end of market norms.',
      recommendations: 'Negotiate escalation down to 5% to 7% or link renewal to fair prevailing market rates.',
    },
    {
      id: 'cl-indemnity-7',
      clauseNumber: '7',
      title: 'Indemnity and Liability Transfer',
      category: 'Legal Liability',
      originalClause:
        'The Tenant agrees to indemnify, defend, and hold harmless the Landlord from any and all claims, damages, liabilities, or legal expenses arising out of any accident, damage, or injury occurring inside the leased apartment, regardless of whether caused by third parties or structural building wear.',
      plainLanguageSummary:
        'If a ceiling collapses or an electrical fault injures someone inside the flat due to old building wiring, you must pay the landlord’s legal fees and damages.',
      riskLevel: 'red_flag',
      riskReason:
        'This is unusual vs. standard practice and may be worth asking a lawyer about. Tenants should never indemnify landlords for structural building defects or pre-existing infrastructural failures.',
      recommendations:
        'Limit tenant indemnity strictly to tenant’s own gross negligence or intentional acts, explicitly excluding structural wear.',
    },
    {
      id: 'cl-arbitration-8',
      clauseNumber: '8',
      title: 'Dispute Resolution via Landlord-Appointed Arbitrator',
      category: 'Dispute Resolution',
      originalClause:
        'Any disputes arising hereunder shall be referred to sole arbitration appointed exclusively by the Landlord in Bengaluru.',
      plainLanguageSummary:
        'If you have a disagreement, the landlord chooses the arbitrator all by themselves, giving them a biased advantage.',
      riskLevel: 'red_flag',
      riskReason:
        'Unilateral appointment of a sole arbitrator raises severe impartiality concerns and has been curtailed by Indian courts. An arbitrator must be mutually agreed upon.',
      recommendations:
        'Replace with mutual agreement on the arbitrator or standard jurisdiction of local civil courts in Bengaluru.',
    },
  ],
  suggestedQuestions: [
    'Can the deposit return window be reduced from 90 days to 15-30 days post-inspection?',
    'Will you provide itemized invoices from registered contractors for any deductions made to the security deposit?',
    'Can the 12-hour right of entry be increased to 24-48 hours notice with mutual scheduling?',
    'Can the indemnity clause be revised to exclude damages resulting from structural wear and tear?',
  ],
  preSigningChecklist: [
    {
      id: 'chk-1',
      category: 'Deposit Protection',
      item: 'Demand removal of clause waiving right to dispute deposit deductions',
      explanation: 'Signing this strips your legal remedy if the landlord arbitrarily withholds funds.',
      priority: 'high',
      completed: false,
    },
    {
      id: 'chk-2',
      category: 'Move-in Inspection',
      item: 'Photograph and video-document all walls, plumbing, and appliances prior to occupancy',
      explanation: 'Protects you from being charged for pre-existing scratches or maintenance issues.',
      priority: 'high',
      completed: false,
    },
    {
      id: 'chk-3',
      category: 'Right of Entry',
      item: 'Increase notice period for landlord visits from 12 hours to 24 hours',
      explanation: 'Preserves personal privacy and ensures you can be present during inspections.',
      priority: 'medium',
      completed: false,
    },
    {
      id: 'chk-4',
      category: 'Annual Escalation',
      item: 'Negotiate the 12% annual escalation down to market standard (5% - 7%)',
      explanation: 'Saves significant money over a multi-year stay.',
      priority: 'medium',
      completed: false,
    },
  ],
};

export const SAMPLE_OFFER_SUMMARY: DocumentSummary = {
  docId: 'sample-offer-letter',
  title: 'Employment Offer & Service Agreement',
  docType: 'Employment Agreement',
  jurisdiction: 'India (Karnataka Shops & Commercial Establishments)',
  executiveSummary:
    'This is an offer letter for a Senior Full-Stack Engineer at NovaSphere Technologies. While the base compensation (INR 28 LPA) is competitive, the contract contains severe employee restrictions: a 24-month worldwide non-compete in AI/Cloud (unenforceable under Indian Section 27 but frequently used to intimidate), a 24-month full bonus clawback even on termination without cause, and broad ownership of inventions created on personal time.',
  keyObligations: [
    'Perform senior full-stack development duties.',
    'Serve 90 days notice post-probation period.',
    'Repay 100% of INR 3,00,000 joining bonus if leaving within 24 months for any reason.',
    'Refrain from working for any cloud or AI company worldwide for 18 months post-exit.',
  ],
  financialTerms: [
    'Base Salary: INR 28,00,000 per annum',
    'Discretionary Bonus: Up to 15% based on company performance',
    'Joining Bonus: INR 3,00,000 subject to 24-month clawback',
  ],
  criticalDeadlines: [
    'Probation Period: 3 months with 7 days notice',
    'Notice Period post-probation: 90 days written notice',
    'Bonus Clawback liability: 24 months from joining date',
    'Non-compete duration: 18 months post-departure',
  ],
  overallRiskScore: 'high',
  riskBreakdown: {
    standard: 2,
    review: 2,
    redFlag: 3,
  },
  clauses: [
    {
      id: 'cl-off-comp-1',
      clauseNumber: '1',
      title: 'Compensation and Discretionary Bonus',
      category: 'Compensation',
      originalClause:
        'Your base salary will be INR 28,00,000 per annum, payable monthly in arrears. You are eligible for a performance bonus of up to 15% based on annual company metrics, distributed at the sole discretion of the Board.',
      plainLanguageSummary:
        'Base salary is INR 28 Lakhs. The 15% bonus is not guaranteed and depends entirely on the company Board’s discretion.',
      riskLevel: 'standard',
      riskReason: 'Discretionary performance bonuses are typical corporate practice.',
      recommendations: 'Clarify target metrics and payout cadence with HR.',
    },
    {
      id: 'cl-off-clawback-2',
      clauseNumber: '2',
      title: 'Signing Bonus 24-Month Clawback',
      category: 'Financial Clawback',
      originalClause:
        'The Company will pay a one-time joining bonus of INR 3,00,000 in your first payroll cycle. However, if your employment terminates for ANY reason (including voluntary resignation or involuntary termination without cause by the Company) within twenty-four (24) months of your start date, you must repay the full 100% gross bonus amount within thirty (30) days.',
      plainLanguageSummary:
        'If you quit or if the company lays you off without cause at month 23, you must pay back the entire INR 3 Lakh joining bonus in full.',
      riskLevel: 'red_flag',
      riskReason:
        'This is unusual vs. standard practice and may be worth asking a lawyer about. Clawbacks usually last 12 months, should be pro-rated monthly, and must never trigger if the company terminates you without cause (layoffs/restructuring).',
      recommendations:
        'Ask to pro-rate the clawback over 12 months, and explicitly exempt involuntary termination without cause or company restructuring.',
    },
    {
      id: 'cl-off-notice-3',
      clauseNumber: '3',
      title: 'At-Will Probation and 90-Day Notice Period',
      category: 'Termination & Notice',
      originalClause:
        'During probation, either party may terminate the relationship with seven (7) days written notice. Post-probation, the required notice period for the Employee is ninety (90) days. The Company reserves the unilateral right to terminate employment immediately by paying base salary in lieu of notice, with no severance or equity vesting.',
      plainLanguageSummary:
        'After probation, you must give 90 days notice before leaving, while the company can fire you instantly on the spot just by paying base pay with zero severance.',
      riskLevel: 'review',
      riskReason:
        'Asymmetric termination terms heavily disadvantage the employee, and a 90-day notice period can hinder securing future job opportunities.',
      recommendations:
        'Propose bilateral 30 or 60 days notice, or option for mutual buyout of notice period.',
    },
    {
      id: 'cl-off-ip-4',
      clauseNumber: '4',
      title: 'Broad Intellectual Property Assignment',
      category: 'Intellectual Property',
      originalClause:
        'You agree that all inventions, software code, algorithms, documentation, designs, and derivative works created by you during your employment—including any projects conceived outside working hours, on personal computers, or on weekends that relate directly or indirectly to the Company’s current or prospective business—shall be the sole and exclusive intellectual property of the Company worldwide in perpetuity.',
      plainLanguageSummary:
        'Any personal side project, open-source code, or weekend hobby app that touches anything related to AI or cloud software belongs to the company, even if done on your personal laptop on Sunday.',
      riskLevel: 'red_flag',
      riskReason:
        'This is unusual vs. standard practice and may be worth asking a lawyer about. Overbroad IP assignments claiming rights to personal time and non-company resources unfairly capture independent side projects.',
      recommendations:
        'Carve out an explicit exhibit listing pre-existing personal projects and restrict IP assignment strictly to work done during company hours using company equipment.',
    },
    {
      id: 'cl-off-noncompete-5',
      clauseNumber: '5',
      title: '18-Month Global Non-Compete & Non-Solicitation',
      category: 'Post-Employment Restraints',
      originalClause:
        'During your employment and for a period of eighteen (18) months following separation, you shall not, directly or indirectly, engage in, advise, invest in, or work for any company, client, or startup developing cloud-based software or artificial intelligence applications globally.',
      plainLanguageSummary:
        'For 1.5 years after leaving, you are banned worldwide from working for any company in the cloud or AI sectors.',
      riskLevel: 'red_flag',
      riskReason:
        'This is unusual vs. standard practice and may be worth asking a lawyer about. Under Indian Contract Act (Section 27), post-employment non-compete restrictions are void and unenforceable as restraints on trade. However, companies include them to intimidate employees.',
      recommendations:
        'Consult legal counsel on local enforceability and request striking the post-employment non-compete or narrowing it to specific named direct competitors.',
    },
  ],
  suggestedQuestions: [
    'Can the joining bonus clawback be made pro-rata over 12 months rather than a cliff at 24 months?',
    'Will you add a clause ensuring clawbacks do not apply in cases of company restructuring or termination without cause?',
    'Can we append an Exhibit A exempting my personal open-source repositories from the IP assignment clause?',
    'Can the post-probation notice period be balanced to 30 or 60 days on both sides?',
  ],
  preSigningChecklist: [
    {
      id: 'chk-off-1',
      category: 'Clawback Protection',
      item: 'Ensure clawback clause excludes layoffs and involuntary separation',
      explanation: 'Prevents owing money if the company downsizes or changes direction.',
      priority: 'high',
      completed: false,
    },
    {
      id: 'chk-off-2',
      category: 'Side Project Exclusions',
      item: 'List existing GitHub repositories and personal projects on a carve-out schedule',
      explanation: 'Guarantees your independent intellectual property remains yours.',
      priority: 'high',
      completed: false,
    },
    {
      id: 'chk-off-3',
      category: 'Non-Compete Review',
      item: 'Confirm local enforceability of the 18-month non-compete with legal aid',
      explanation: 'Protects your future mobility in tech without fear of frivolous legal threats.',
      priority: 'medium',
      completed: false,
    },
  ],
};

export const SAMPLE_COMPARISON_RESULT: ComparisonResult = {
  docAName: 'Sample Rental Agreement',
  docBName: 'Sample Offer Letter',
  executiveComparison:
    'Comparing these two contracts illustrates contrasting risk profiles between property tenancy and tech employment. The Tenancy Agreement exposes the user to severe financial lock-in and deposit confiscation risks, whereas the Employment Agreement imposes significant career mobility restraints through overbroad IP assignment and nationwide non-compete clauses.',
  items: [
    {
      category: 'Financial Penalty / Forfeiture',
      clauseTitle: 'Exit & Termination Penalties',
      docAValue: 'Forfeiture of full INR 2,50,000 security deposit if vacating within 6 months.',
      docBValue: 'Full repayment of INR 3,00,000 joining bonus if leaving within 24 months.',
      favorabilityWinner: 'neutral',
      explanation:
        'Both impose severe financial lock-ins. The lease penalizes sudden life/work relocation, while the offer letter penalizes career transition even if laid off.',
      potentialRiskNotes: 'Both require negotiation before signing.',
    },
    {
      category: 'Notice Period Requirements',
      clauseTitle: 'Advance Termination Notice',
      docAValue: '2 months written notice required from either party.',
      docBValue: '90 days written notice from employee; immediate dismissal option for company.',
      favorabilityWinner: 'docA',
      explanation:
        'The Rental Agreement is bilateral (2 months for both). The Employment contract is asymmetric and forces a lengthy 90-day waiting period on the employee.',
      potentialRiskNotes: 'Asymmetry in employment contracts limits negotiation leverage with future employers.',
    },
    {
      category: 'Dispute Resolution & Due Process',
      clauseTitle: 'Dispute Forum & Impartiality',
      docAValue: 'Sole arbitrator appointed exclusively by the Landlord.',
      docBValue: 'Arbitration under Indian Arbitration Act with shared fees.',
      favorabilityWinner: 'docB',
      explanation:
        'Unilateral arbitrator appointment in the lease is inherently one-sided and legally questionable. The offer letter specifies standard shared arbitration.',
      potentialRiskNotes: 'Arbitration can still be costly for individual employees vs corporations.',
    },
    {
      category: 'Restraints on Rights / Privacy',
      clauseTitle: 'Freedom of Movement & Privacy',
      docAValue: 'Landlord entry on 12-hour digital notice; broad indemnity for structural defects.',
      docBValue: '18-month worldwide non-compete in AI/Cloud; claim over personal-time side projects.',
      favorabilityWinner: 'docA',
      explanation:
        'While 12-hour entry is invasive, the employment contract’s 18-month global non-compete threatens the employee’s entire livelihood and ability to earn in tech.',
      potentialRiskNotes: 'Section 27 of Indian Contract Act makes post-employment non-competes void.',
    },
  ],
  overallRecommendation:
    'Both contracts exhibit clauses requiring renegotiation. For the Lease, focus on shortening deposit return timelines and removing the unilateral arbitrator appointment. For the Employment Offer, prioritize pro-rating the clawback, protecting personal side projects, and narrowing the non-compete covenant.',
};
