'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, ActiveTab } from '@/components/Navbar';
import { LandingHero } from '@/components/LandingHero';
import { UploadDropzone } from '@/components/UploadDropzone';
import { SummaryView } from '@/components/SummaryView';
import { CompareView } from '@/components/CompareView';
import { ChatWidget } from '@/components/ChatWidget';
import { ChecklistExport } from '@/components/ChecklistExport';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import {
  DocumentSummary,
  EngineStatus,
  ComparisonResult,
} from '@/types';
import {
  SAMPLE_RENTAL_AGREEMENT_TEXT,
  SAMPLE_OFFER_LETTER_TEXT,
  SAMPLE_RENTAL_SUMMARY,
  SAMPLE_OFFER_SUMMARY,
  SAMPLE_COMPARISON_RESULT,
} from '@/lib/sample-docs';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  // State for document management
  const [documentText, setDocumentText] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [comparison, setComparison] = useState<ComparisonResult | null>(SAMPLE_COMPARISON_RESULT);

  // UI state: defaults to starting page ('landing')
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [jurisdiction, setJurisdiction] = useState<string>('India');
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [engineStatus, setEngineStatus] = useState<EngineStatus | null>(null);

  // Fetch engine status
  const checkStatus = useCallback(async (keyToTest?: string) => {
    try {
      const activeKey = keyToTest !== undefined ? keyToTest : apiKey;
      const headers: Record<string, string> = {};
      if (activeKey) headers['x-gemini-key'] = activeKey;

      const res = await fetch('/api/engine-status', { headers });
      const json = await res.json();
      if (json.success && json.data) {
        setEngineStatus(json.data);
      }
    } catch (err) {
      console.warn('Could not fetch engine status:', err);
    }
  }, [apiKey]);

  // Load saved key from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('clarity_gemini_api_key') || '';
      if (savedKey) {
        setApiKey(savedKey);
        checkStatus(savedKey);
      } else {
        checkStatus('');
      }
    } catch {
      checkStatus('');
    }
  }, [checkStatus]);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem('clarity_gemini_api_key', newKey);
      } else {
        localStorage.removeItem('clarity_gemini_api_key');
      }
    } catch {}
    checkStatus(newKey);
  };

  // Handle document upload or selection
  const handleDocumentLoaded = async (
    rawText: string,
    filename: string,
    precomputedSummary?: DocumentSummary
  ) => {
    setDocumentText(rawText);
    setDocumentTitle(filename);

    if (precomputedSummary) {
      setSummary(precomputedSummary);
      setActiveTab('summary');
      return;
    }

    // Call server API to dynamically summarize uploaded custom document
    setIsSummarizing(true);
    setActiveTab('summary');

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) headers['x-gemini-key'] = apiKey;

      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          text: rawText,
          title: filename,
          jurisdiction,
          apiKey,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSummary(json.data);
      }
    } catch (err) {
      console.error('Error generating summary:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  // Quick Demo Loaders from Landing Page
  const handleLoadSampleRental = () => {
    handleDocumentLoaded(
      SAMPLE_RENTAL_AGREEMENT_TEXT,
      'Sample Residential Rental Agreement.txt',
      SAMPLE_RENTAL_SUMMARY
    );
  };

  const handleLoadSampleOffer = () => {
    handleDocumentLoaded(
      SAMPLE_OFFER_LETTER_TEXT,
      'Sample Senior Engineer Offer Letter.txt',
      SAMPLE_OFFER_SUMMARY
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasDocument={!!documentText}
        engineStatus={engineStatus}
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
      />

      {/* Main Workspace Landmark */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Screen 1: Welcome & Landing Page */}
        {activeTab === 'landing' && (
          <LandingHero
            onGetStarted={() => setActiveTab('upload')}
            onTrySampleRental={handleLoadSampleRental}
            onTrySampleOffer={handleLoadSampleOffer}
            onGoToCompare={() => setActiveTab('compare')}
          />
        )}

        {/* Screen 2: Upload Dropzone & Sample Loaders */}
        {activeTab === 'upload' && (
          <UploadDropzone
            onDocumentLoaded={handleDocumentLoaded}
            isLoading={isSummarizing}
          />
        )}

        {/* Screen 3: Document Summary & Clauses */}
        {activeTab === 'summary' && (
          <>
            {isSummarizing ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" aria-hidden="true" />
                <h2 className="text-xl font-bold text-slate-800">
                  Analyzing Your Uploaded Legal Document...
                </h2>
                <p className="text-xs text-slate-500 max-w-md">
                  Dynamically extracting real clauses, financial covenants, notice deadlines, and assessing risk levels (Standard / Review / Red Flag).
                </p>
              </div>
            ) : summary ? (
              <SummaryView
                summary={summary}
                onNavigateToChat={() => setActiveTab('chat')}
                onNavigateToChecklist={() => setActiveTab('checklist')}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs space-y-4">
                <p className="text-slate-600 text-sm">No document loaded yet. Please upload or select a contract.</p>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="px-5 py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs hover:bg-indigo-700 transition-colors"
                  >
                    Upload a Contract
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSampleRental}
                    className="px-5 py-2.5 bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Load Sample Lease
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Screen 4: Side-by-Side Semantic Compare */}
        {activeTab === 'compare' && (
          <CompareView initialComparison={comparison} />
        )}

        {/* Screen 5: Strictly Grounded Document Q&A Chat */}
        {activeTab === 'chat' && (
          <>
            {documentText ? (
              <ChatWidget
                documentText={documentText}
                docTitle={documentTitle}
                suggestedQuestions={summary?.suggestedQuestions}
                apiKey={apiKey}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs space-y-4">
                <p className="text-slate-600 text-sm">Please upload or load a document first to chat with it.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  Upload or Select a Contract
                </button>
              </div>
            )}
          </>
        )}

        {/* Screen 6: Pre-Signing Checklist & PDF Export */}
        {activeTab === 'checklist' && (
          <>
            {summary ? (
              <ChecklistExport summary={summary} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs space-y-4">
                <p className="text-slate-600 text-sm">
                  Please load a document first to generate an actionable pre-signing checklist.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  Select or Upload a Contract
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Gemini API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
