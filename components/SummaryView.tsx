'use client';

import React, { useState } from 'react';
import { DocumentSummary, RiskLevel } from '@/types';
import { ClauseCard } from './ClauseCard';
import { RiskBadge } from './RiskBadge';
import {
  FileText,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface SummaryViewProps {
  summary: DocumentSummary;
  onNavigateToChat?: () => void;
  onNavigateToChecklist?: () => void;
}

export function SummaryView({
  summary,
  onNavigateToChat,
  onNavigateToChecklist,
}: SummaryViewProps) {
  const [filter, setFilter] = useState<'all' | RiskLevel>('all');

  const filteredClauses = summary.clauses.filter((c) => {
    if (filter === 'all') return true;
    return c.riskLevel === filter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Document Header & Executive Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>{summary.docType} • {summary.jurisdiction}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {summary.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigateToChecklist && (
              <button
                type="button"
                onClick={onNavigateToChecklist}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                <span>View Checklist & PDF</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            {onNavigateToChat && (
              <button
                type="button"
                onClick={onNavigateToChat}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" aria-hidden="true" />
                <span>Ask Document</span>
              </button>
            )}
          </div>
        </div>

        {/* Plain-Language Executive Summary */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
            Executive Plain-Language Overview
          </h3>
          <p className="text-slate-800 leading-relaxed text-base bg-slate-50/80 border border-slate-200/80 p-5 rounded-xl font-normal">
            {summary.executiveSummary}
          </p>
        </div>

        {/* Risk Breakdown Cards / Visual Gauge */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-lg">
                <AlertOctagon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block">
                  Potential Red Flags
                </span>
                <span className="text-2xl font-black text-rose-950">
                  {summary.riskBreakdown.redFlag}
                </span>
              </div>
            </div>
            <RiskBadge level="red_flag" size="sm" />
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-700 rounded-lg">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block">
                  Worth Reviewing
                </span>
                <span className="text-2xl font-black text-amber-950">
                  {summary.riskBreakdown.review}
                </span>
              </div>
            </div>
            <RiskBadge level="review" size="sm" />
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                  Standard Clauses
                </span>
                <span className="text-2xl font-black text-emerald-950">
                  {summary.riskBreakdown.standard}
                </span>
              </div>
            </div>
            <RiskBadge level="standard" size="sm" />
          </div>
        </div>

        {/* Key Contractual Fast Facts (Obligations, Financials, Deadlines) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          {/* Key Obligations */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-indigo-600" aria-hidden="true" />
              <span>Key Obligations</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {summary.keyObligations.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Financial Terms */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Financial Terms</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {summary.financialTerms.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Deadlines */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-amber-600" aria-hidden="true" />
              <span>Critical Deadlines</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {summary.criticalDeadlines.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Clause-by-Clause Breakdown Section */}
      <section aria-labelledby="clauses-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 id="clauses-heading" className="text-xl font-bold text-slate-900">
              Clause-by-Clause Analysis ({summary.clauses.length} Clauses Identified)
            </h3>
            <p className="text-xs text-slate-500">
              Each clause translated into plain English with specific risk assessments and counter-proposals.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-auto" role="group" aria-label="Filter clauses by risk level">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5 hidden sm:inline" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({summary.clauses.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('red_flag')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === 'red_flag'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              Red Flags ({summary.riskBreakdown.redFlag})
            </button>
            <button
              type="button"
              onClick={() => setFilter('review')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === 'review'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              Review ({summary.riskBreakdown.review})
            </button>
            <button
              type="button"
              onClick={() => setFilter('standard')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === 'standard'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              Standard ({summary.riskBreakdown.standard})
            </button>
          </div>
        </div>

        {/* Clause Cards Stack */}
        <div className="space-y-4">
          {filteredClauses.map((clause, idx) => (
            <ClauseCard
              key={clause.id}
              clause={clause}
              defaultExpanded={clause.riskLevel === 'red_flag' || idx === 0}
            />
          ))}

          {filteredClauses.length === 0 && (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm">
              No clauses matched the selected filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
