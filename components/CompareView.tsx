'use client';

import React, { useState } from 'react';
import { ComparisonResult } from '@/types';
import { SAMPLE_COMPARISON_RESULT, SAMPLE_RENTAL_AGREEMENT_TEXT, SAMPLE_OFFER_LETTER_TEXT } from '@/lib/sample-docs';
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  Sparkles,
  HelpCircle,
  FileText,
  Loader2,
  UploadCloud,
  FileCheck,
} from 'lucide-react';

interface CompareViewProps {
  initialComparison?: ComparisonResult | null;
  onCompareRequest?: (docA: string, docB: string, nameA: string, nameB: string) => Promise<ComparisonResult | null>;
  uploadedDocText?: string;
  uploadedDocTitle?: string;
}

export function CompareView({
  initialComparison,
  onCompareRequest,
  uploadedDocText,
  uploadedDocTitle,
}: CompareViewProps) {
  const [comparison, setComparison] = useState<ComparisonResult | null>(
    initialComparison || SAMPLE_COMPARISON_RESULT
  );
  const [loading, setLoading] = useState(false);
  const [customDocA, setCustomDocA] = useState(uploadedDocText || SAMPLE_RENTAL_AGREEMENT_TEXT);
  const [customDocB, setCustomDocB] = useState(SAMPLE_OFFER_LETTER_TEXT);
  const [nameA, setNameA] = useState(uploadedDocTitle || 'Sample Rental Agreement');
  const [nameB, setNameB] = useState('Sample Offer Letter');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [uploadingA, setUploadingA] = useState(false);
  const [uploadingB, setUploadingB] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'A' | 'B') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (target === 'A') setUploadingA(true);
    else setUploadingB(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        if (target === 'A') {
          setNameA(json.data.filename);
          setCustomDocA(json.data.text);
        } else {
          setNameB(json.data.filename);
          setCustomDocB(json.data.text);
        }
      } else {
        setUploadError(json.error || `Failed to parse ${file.name}`);
      }
    } catch {
      setUploadError(`Network error uploading ${file.name}`);
    } finally {
      if (target === 'A') setUploadingA(false);
      else setUploadingB(false);
      e.target.value = '';
    }
  };

  const handleRunComparison = async () => {
    setLoading(true);
    try {
      if (onCompareRequest) {
        const result = await onCompareRequest(customDocA, customDocB, nameA, nameB);
        if (result) setComparison(result);
      } else {
        const res = await fetch('/api/compare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            docAText: customDocA,
            docBText: customDocB,
            docAName: nameA,
            docBName: nameB,
          }),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setComparison(json.data);
        }
      }
    } catch (e) {
      console.error('Error during comparison:', e);
    } finally {
      setLoading(false);
    }
  };

  const getWinnerBadge = (winner: 'docA' | 'docB' | 'neutral', docAName: string, docBName: string) => {
    if (winner === 'docA') {
      return (
        <span
          role="status"
          aria-label={`More favorable side: ${docAName}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>More Favorable: {docAName}</span>
        </span>
      );
    }
    if (winner === 'docB') {
      return (
        <span
          role="status"
          aria-label={`More favorable side: ${docBName}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-700" aria-hidden="true" />
          <span>More Favorable: {docBName}</span>
        </span>
      );
    }
    return (
      <span
        role="status"
        aria-label="Neutral favorability between both documents"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300"
      >
        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
        <span>Neutral / Similar Risk</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span>Semantic Side-by-Side Comparison</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Contract Risk & Favorability Comparison
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Unlike a simple text diff, Clarity performs conceptual legal comparison across key clause domains to highlight which document offers better signer protections.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              {showCustomInput ? 'Hide Custom Inputs' : 'Compare Custom Texts'}
            </button>
          </div>
        </div>

        {/* Custom Input Drawer */}
        {showCustomInput && (
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                <span>Custom Document Inputs for Semantic Comparison</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                Upload files (.docx, .pdf, .txt) or paste contract text directly below
              </span>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document A */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="doc-a-name" className="text-xs font-bold text-slate-800">
                    Document A
                  </label>
                  <div className="flex items-center gap-2">
                    {uploadedDocText && (
                      <button
                        type="button"
                        onClick={() => {
                          setNameA(uploadedDocTitle || 'Uploaded Contract');
                          setCustomDocA(uploadedDocText);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
                        title="Use the document currently uploaded in the workspace"
                      >
                        <FileCheck className="w-3 h-3 text-indigo-600" aria-hidden="true" />
                        <span>Use Uploaded Doc</span>
                      </button>
                    )}
                    <label className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer text-slate-700 transition-colors shadow-2xs">
                      {uploadingA ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-indigo-600" aria-hidden="true" />
                          <span>Extracting...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
                          <span>Upload DOCX / PDF</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept=".docx,.pdf,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                        onChange={(e) => handleFileUpload(e, 'A')}
                        disabled={uploadingA}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="doc-a-name" className="block text-[11px] text-slate-500 mb-1">
                    Document Title:
                  </label>
                  <input
                    id="doc-a-name"
                    type="text"
                    value={nameA}
                    onChange={(e) => setNameA(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Tenancy Agreement v1"
                  />
                </div>

                <div>
                  <label htmlFor="doc-a-text" className="block text-[11px] text-slate-500 mb-1">
                    Contract Text:
                  </label>
                  <textarea
                    id="doc-a-text"
                    rows={7}
                    value={customDocA}
                    onChange={(e) => setCustomDocA(e.target.value)}
                    className="w-full text-xs font-mono p-3 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Paste or upload text of first contract..."
                  />
                </div>
              </div>

              {/* Document B */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="doc-b-name" className="text-xs font-bold text-slate-800">
                    Document B
                  </label>
                  <label className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer text-slate-700 transition-colors shadow-2xs">
                    {uploadingB ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-indigo-600" aria-hidden="true" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
                        <span>Upload DOCX / PDF</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".docx,.pdf,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                      onChange={(e) => handleFileUpload(e, 'B')}
                      disabled={uploadingB}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="doc-b-name" className="block text-[11px] text-slate-500 mb-1">
                    Document Title:
                  </label>
                  <input
                    id="doc-b-name"
                    type="text"
                    value={nameB}
                    onChange={(e) => setNameB(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Counter Offer or Standard Template"
                  />
                </div>

                <div>
                  <label htmlFor="doc-b-text" className="block text-[11px] text-slate-500 mb-1">
                    Contract Text:
                  </label>
                  <textarea
                    id="doc-b-text"
                    rows={7}
                    value={customDocB}
                    onChange={(e) => setCustomDocB(e.target.value)}
                    className="w-full text-xs font-mono p-3 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Paste or upload text of second contract..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleRunComparison}
                disabled={loading || uploadingA || uploadingB || !customDocA.trim() || !customDocB.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-xs disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Analyzing Documents...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Run Semantic Comparison</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Executive Comparison Summary */}
        {comparison && (
          <div className="mt-6 space-y-4">
            <div className="p-5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-700" aria-hidden="true" />
                <span>Executive Comparative Synthesis</span>
              </h3>
              <p className="text-sm text-indigo-950 leading-relaxed font-normal">
                {comparison.executiveComparison}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-semibold text-slate-900">Overall Recommendation: </strong>
                <span>{comparison.overallRecommendation}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Semantic Comparison Table */}
      {comparison && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Clause Domain Comparison Table
            </h3>
            <span className="text-xs text-slate-500">
              Comparing: <strong>{comparison.docAName}</strong> vs. <strong>{comparison.docBName}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">
                Semantic Comparison Table comparing clause terms and favorability between {comparison.docAName} and {comparison.docBName}
              </caption>
              <thead>
                <tr className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th scope="col" className="p-4 w-1/4">Clause Category & Title</th>
                  <th scope="col" className="p-4 w-1/4">{comparison.docAName}</th>
                  <th scope="col" className="p-4 w-1/4">{comparison.docBName}</th>
                  <th scope="col" className="p-4 w-1/4">Favorability & Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparison.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 align-top">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                        {item.category}
                      </span>
                      <strong className="text-slate-900 font-semibold text-sm block">
                        {item.clauseTitle}
                      </strong>
                    </td>

                    <td className="p-4 align-top bg-slate-50/40 border-r border-slate-100 text-slate-800">
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed font-mono">
                        {item.docAValue}
                      </div>
                    </td>

                    <td className="p-4 align-top bg-slate-50/40 border-r border-slate-100 text-slate-800">
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed font-mono">
                        {item.docBValue}
                      </div>
                    </td>

                    <td className="p-4 align-top space-y-2">
                      <div>{getWinnerBadge(item.favorabilityWinner, comparison.docAName, comparison.docBName)}</div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.explanation}
                      </p>
                      {item.potentialRiskNotes && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded-md border border-amber-200/80">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                          <span>{item.potentialRiskNotes}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
