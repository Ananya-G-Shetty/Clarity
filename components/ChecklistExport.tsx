'use client';

import React, { useState } from 'react';
import { ChecklistItem, LawyerQuestion, DocumentSummary } from '@/types';
import { exportChecklistAndQuestionsPdf } from '@/lib/pdf-generator';
import {
  CheckSquare,
  FileDown,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Shield,
  Briefcase,
} from 'lucide-react';

interface ChecklistExportProps {
  summary: DocumentSummary;
}

export function ChecklistExport({ summary }: ChecklistExportProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    summary.preSigningChecklist || [
      {
        id: 'chk-1',
        category: 'Negotiation',
        item: 'Request amendment of deposit return deadline to 15-30 days',
        explanation: 'Reduces the landlord’s unilateral 90-day holding privilege.',
        priority: 'high',
        completed: false,
      },
      {
        id: 'chk-2',
        category: 'Remedies',
        item: 'Strike clause waiving the right to dispute deductions exceeding 20%',
        explanation: 'Preserves your right to challenge arbitrary or undocumented charges.',
        priority: 'high',
        completed: false,
      },
      {
        id: 'chk-3',
        category: 'Privacy',
        item: 'Increase landlord entry notice from 12 hours to 24-48 hours',
        explanation: 'Ensures reasonable personal privacy and scheduled inspections.',
        priority: 'medium',
        completed: false,
      },
    ]
  );

  const lawyerQuestions: LawyerQuestion[] = summary.clauses
    .filter((c) => c.riskLevel !== 'standard')
    .map((c, i) => ({
      id: `q-${i + 1}`,
      clauseRef: `${c.title} (Clause ${c.clauseNumber || i + 1})`,
      question: `Given the terms of ${c.title}, what is the customary statutory limit under local law, and what specific replacement clause should I counter with?`,
      context: c.riskReason,
    }));

  const [copied, setCopied] = useState(false);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleDownloadPdf = () => {
    exportChecklistAndQuestionsPdf(
      summary.title,
      checklist,
      lawyerQuestions,
      summary.jurisdiction
    );
  };

  const handleCopyText = async () => {
    const textOutput = `CLARITY — PRE-SIGNING ACTION PACK FOR: ${summary.title}
Jurisdiction: ${summary.jurisdiction}
Legal Notice: Clarity provides legal information, not licensed legal advice.

==================================================
1. PRE-SIGNING CHECKLIST:
==================================================
${checklist
  .map(
    (item, i) =>
      `[${item.completed ? 'X' : ' '}] ${i + 1}. [${item.priority.toUpperCase()}] ${item.item}\n    Why: ${item.explanation}`
  )
  .join('\n\n')}

==================================================
2. QUESTIONS TO ASK A LAWYER:
==================================================
${lawyerQuestions
  .map(
    (q, i) =>
      `Q${i + 1} (${q.clauseRef}):\nQuestion: ${q.question}\nContext: ${q.context}`
  )
  .join('\n\n')}
`;

    try {
      await navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      alert('Unable to copy to clipboard.');
    }
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / (checklist.length || 1)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
              <CheckSquare className="w-4 h-4" aria-hidden="true" />
              <span>Actionable Pre-Signing Outputs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pre-Signing Checklist & Questions for Lawyer
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Generated automatically from the identified risk clauses in <strong>{summary.title}</strong>. Download as a formatted PDF or copy for your lawyer consultation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-slate-400"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              <span>Download PDF Action Pack</span>
            </button>
          </div>
        </div>

        {/* Checklist Progress Bar */}
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Pre-Signing Review Progress: {completedCount} of {checklist.length} items reviewed</span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Pre-Signing Checklist */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                <span>Pre-Signing Checklist</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {checklist.length} Action Items
              </span>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                    item.completed
                      ? 'bg-slate-50/60 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-2xs'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}} // handled by parent onClick
                    id={`check-${item.id}`}
                    aria-label={`Mark checklist item: ${item.item}`}
                    className="mt-1 w-4 h-4 rounded-sm text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          item.priority === 'high'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <label
                      htmlFor={`check-${item.id}`}
                      className={`text-xs sm:text-sm font-semibold block cursor-pointer ${
                        item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.item}
                    </label>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Questions to Ask a Lawyer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              <span>Questions to Ask a Licensed Lawyer</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {lawyerQuestions.length} Questions
            </span>
          </div>

          <div className="space-y-3">
            {lawyerQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-xl space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-amber-200/70 text-amber-900 rounded-sm">
                    {q.clauseRef}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  Q{idx + 1}: {q.question}
                </h4>
                <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-white/70 p-2.5 rounded-lg border border-amber-200/40">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Context: </strong> {q.context}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
