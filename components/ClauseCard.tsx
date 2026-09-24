'use client';

import React, { useState } from 'react';
import { ClauseAnalysis } from '@/types';
import { RiskBadge } from './RiskBadge';
import { GlossaryTerm } from './GlossaryTerm';
import { ChevronDown, ChevronUp, HelpCircle, FileText, Lightbulb } from 'lucide-react';

interface ClauseCardProps {
  clause: ClauseAnalysis;
  defaultExpanded?: boolean;
}

export function ClauseCard({ clause, defaultExpanded = false }: ClauseCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Helper to render plain language summary with interactive glossary terms
  const renderInteractiveText = (text: string) => {
    const terms = [
      'indemnity',
      'force majeure',
      'liquidated damages',
      'severability',
      'non-compete',
      'arbitration',
      'lock-in period',
      'intellectual property assignment',
      'entire agreement',
      'clawback',
      'governing law',
      'right of entry',
    ];

    // Find any term that exists in the text
    const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (terms.includes(lower)) {
        return <GlossaryTerm key={i} term={lower}>{part}</GlossaryTerm>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className={`border rounded-xl transition-all duration-200 bg-white overflow-hidden shadow-xs hover:shadow-card ${
        clause.riskLevel === 'red_flag'
          ? 'border-rose-200 ring-1 ring-rose-100'
          : clause.riskLevel === 'review'
          ? 'border-amber-200'
          : 'border-slate-200'
      }`}
    >
      {/* Header bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <span className="shrink-0 text-xs font-mono font-bold px-2.5 py-1 bg-slate-200/70 text-slate-800 rounded-md">
            Clause {clause.clauseNumber || '•'}
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900 leading-snug">
              {clause.title}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Category: {clause.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <RiskBadge level={clause.riskLevel} />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`clause-detail-${clause.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
            title={isExpanded ? 'Collapse clause details' : 'Expand clause details'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
            <span className="sr-only">
              {isExpanded ? `Collapse details for ${clause.title}` : `Expand details for ${clause.title}`}
            </span>
          </button>
        </div>
      </div>

      {/* Primary Plain-English Summary */}
      <div className="p-4 sm:p-5 space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Plain-English Translation
          </h4>
          <p className="text-sm text-slate-800 leading-relaxed font-normal">
            {renderInteractiveText(clause.plainLanguageSummary)}
          </p>
        </div>

        {/* Why this matters / Risk reasoning */}
        <div
          className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
            clause.riskLevel === 'red_flag'
              ? 'bg-rose-50/70 text-rose-950 border-rose-200'
              : clause.riskLevel === 'review'
              ? 'bg-amber-50/70 text-amber-950 border-amber-200'
              : 'bg-emerald-50/50 text-emerald-950 border-emerald-200'
          }`}
        >
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-semibold block mb-0.5">
                {clause.riskLevel === 'red_flag'
                  ? 'Why this is a Potential Red Flag:'
                  : clause.riskLevel === 'review'
                  ? 'Why this is Worth Reviewing:'
                  : 'Standard Contractual Context:'}
              </strong>
              <span>{clause.riskReason}</span>
            </div>
          </div>
        </div>

        {/* Expanded View: Original Clause & Recommendations */}
        {isExpanded && (
          <div
            id={`clause-detail-${clause.id}`}
            className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150"
          >
            {/* Practical Recommendation / Counter-proposal */}
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-lg text-xs leading-relaxed text-indigo-950">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="font-semibold text-indigo-900 block mb-0.5">
                    What to ask or propose in negotiation:
                  </strong>
                  <span>{clause.recommendations}</span>
                </div>
              </div>
            </div>

            {/* Original Legal Clause Text */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span>Original Source Clause</span>
              </div>
              <div className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto select-text border border-slate-800">
                {clause.originalClause}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
