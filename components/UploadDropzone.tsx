'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import {
  SAMPLE_RENTAL_AGREEMENT_TEXT,
  SAMPLE_OFFER_LETTER_TEXT,
  SAMPLE_RENTAL_SUMMARY,
  SAMPLE_OFFER_SUMMARY,
} from '@/lib/sample-docs';
import { DocumentSummary } from '@/types';

interface UploadDropzoneProps {
  onDocumentLoaded: (rawText: string, filename: string, summary?: DocumentSummary) => void;
  isLoading?: boolean;
}

export function UploadDropzone({ onDocumentLoaded, isLoading = false }: UploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    setUploadProgress(10);

    // Client-side quick checks
    const allowed = ['pdf', 'docx', 'txt', 'png', 'jpg', 'jpeg'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowed.includes(ext)) {
      setError(`Unsupported file type ".${ext}". Please upload a PDF, DOCX, TXT, PNG, or JPG contract.`);
      setIsProcessing(false);
      setUploadProgress(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(`File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 5.0 MB maximum limit.`);
      setIsProcessing(false);
      setUploadProgress(null);
      return;
    }

    try {
      setUploadProgress(40);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(75);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || 'Failed to parse document. Please check file format.');
        setIsProcessing(false);
        setUploadProgress(null);
        return;
      }

      setUploadProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setUploadProgress(null);
        onDocumentLoaded(json.data.text, json.data.filename);
      }, 400);
    } catch {
      setError('Network error occurred during document upload and parsing.');
      setIsProcessing(false);
      setUploadProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Instant 1-Click Preloaded Sample Handlers
  const handleLoadSampleRental = () => {
    setError(null);
    onDocumentLoaded(
      SAMPLE_RENTAL_AGREEMENT_TEXT,
      'Sample Residential Rental Agreement.txt',
      SAMPLE_RENTAL_SUMMARY
    );
  };

  const handleLoadSampleOffer = () => {
    setError(null);
    onDocumentLoaded(
      SAMPLE_OFFER_LETTER_TEXT,
      'Sample Senior Engineer Offer Letter.txt',
      SAMPLE_OFFER_SUMMARY
    );
  };

  const activeLoading = isLoading || isProcessing;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1-Click Instant Demo Contracts Callout */}
      <div className="bg-linear-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
              <span>Instant Live Demo (Zero Upload Required)</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Evaluate Clarity Immediately with Pre-Loaded Contracts
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Test Summarize, Clause Risk Scoring, Document Q&A, and Semantic Compare instantly using realistic contracts tailored with high-impact tenant and employee covenants.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={handleLoadSampleRental}
              disabled={activeLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-indigo-600" aria-hidden="true" />
              <span>Load Sample Rental Lease</span>
              <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleLoadSampleOffer}
              disabled={activeLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all border border-indigo-400/30 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-indigo-300" aria-hidden="true" />
              <span>Load Sample Offer Letter</span>
              <ArrowRight className="w-4 h-4 text-indigo-300" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Drag & Drop Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Or Upload Your Own Contract for Analysis
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Supported file formats: PDF, DOCX, TXT, PNG, JPG (Max 5.0 MB). Data is parsed securely server-side and never saved without consent.
        </p>

        {error && (
          <div
            role="alert"
            className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in"
          >
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-semibold block mb-0.5">Upload Error</strong>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/60'
          } ${activeLoading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg"
            onChange={handleFileChange}
            id="contract-file-upload-input"
            className="hidden"
            aria-label="Upload legal contract file (PDF, DOCX, TXT, PNG, JPG)"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              {activeLoading ? (
                <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
              ) : (
                <UploadCloud className="w-8 h-8" aria-hidden="true" />
              )}
            </div>

            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-800">
                {activeLoading ? (
                  <span>Extracting and analyzing legal clauses...</span>
                ) : (
                  <span>
                    Click to browse or drag and drop your agreement here
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Leases, Employment Contracts, NDAs, Freelancer Agreements, Service Contracts
              </p>
            </div>

            {uploadProgress !== null && (
              <div className="w-full max-w-xs mt-4">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Processing document</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                    role="progressbar"
                    aria-valuenow={uploadProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security & Confidentiality Reassurance */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Strict Client-Server Isolation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Zero Persistent Storage by Default</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>XSS Sanitized & Allowlist Enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
