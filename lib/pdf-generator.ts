/**
 * lib/pdf-generator.ts
 *
 * Client-side lightweight PDF generator using jsPDF.
 * Generates an executive Pre-Signing Checklist and Questions for a Lawyer document.
 */

import jsPDF from 'jspdf';
import { ChecklistItem, LawyerQuestion } from '@/types';

export function exportChecklistAndQuestionsPdf(
  docTitle: string,
  checklist: ChecklistItem[],
  lawyerQuestions: LawyerQuestion[],
  jurisdiction = 'India'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 280) {
      doc.addPage();
      y = 18;
      // Add page header
      doc.setFontSize(8);
      doc.setTextColor(130, 154, 177);
      doc.text(`Clarity Legal Assistant — ${docTitle} | Page ${doc.getNumberOfPages()}`, margin, 10);
    }
  };

  // Header Banner
  doc.setFillColor(11, 19, 43); // Navy brand
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('CLARITY — Pre-Signing Action Pack', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 215, 230);
  doc.text(`Generated for: ${docTitle} | Jurisdiction: ${jurisdiction}`, margin, 18);

  y = 32;

  // Permanent Disclaimer Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(153, 27, 27);
  doc.text('LEGAL DISCLAIMER & COMPLIANCE NOTICE:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(
    'Clarity provides legal information to help you understand documents. It is not a substitute for advice from a licensed attorney.',
    margin + 4,
    y + 10
  );

  y += 22;

  // Section 1: Pre-Signing Checklist
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(16, 42, 67);
  doc.text('1. Actionable Pre-Signing Checklist', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(72, 101, 129);
  doc.text('Review and negotiate these high-priority items before executing the agreement.', margin, y);
  y += 6;

  checklist.forEach((item, idx) => {
    checkPageBreak(22);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

    // Priority tag
    const isHigh = item.priority === 'high';
    doc.setFillColor(isHigh ? 220 : 245, isHigh ? 38 : 158, isHigh ? 38 : 11);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    const tagText = isHigh ? 'HIGH PRIORITY' : 'MODERATE';
    doc.roundedRect(margin + 3, y + 3, 24, 4.5, 1, 1, 'F');
    doc.text(tagText, margin + 5, y + 6.2);

    // Title
    doc.setTextColor(16, 42, 67);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    const itemTitle = `${idx + 1}. [${item.category}] ${item.item}`;
    doc.text(doc.splitTextToSize(itemTitle, contentWidth - 36), margin + 30, y + 6.5);

    // Explanation
    doc.setTextColor(72, 101, 129);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const expl = doc.splitTextToSize(item.explanation, contentWidth - 10);
    doc.text(expl, margin + 4, y + 13.5);

    y += 21;
  });

  y += 4;
  checkPageBreak(30);

  // Section 2: Questions to Ask a Lawyer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(16, 42, 67);
  doc.text('2. Questions to Ask a Licensed Lawyer', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(72, 101, 129);
  doc.text(
    'Take this prepared list to your legal consultation to get precise advice on problematic clauses.',
    margin,
    y
  );
  y += 6;

  lawyerQuestions.forEach((q, idx) => {
    checkPageBreak(22);

    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(253, 230, 138);
    doc.roundedRect(margin, y, contentWidth, 19, 1.5, 1.5, 'FD');

    // Clause badge
    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`Clause Reference: ${q.clauseRef}`, margin + 4, y + 5);

    // Question
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const qLines = doc.splitTextToSize(`Q${idx + 1}: ${q.question}`, contentWidth - 8);
    doc.text(qLines, margin + 4, y + 10);

    // Context
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    const ctxLines = doc.splitTextToSize(`Context: ${q.context}`, contentWidth - 8);
    doc.text(ctxLines, margin + 4, y + 15.5);

    y += 22;
  });

  // Footer on current page
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Clarity Document Intelligence • https://clarity-legal.app • Generated ${new Date().toLocaleDateString()}`,
    margin,
    288
  );

  const safeFilename = docTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
  doc.save(`clarity-pre-signing-checklist-${safeFilename}.pdf`);
}
