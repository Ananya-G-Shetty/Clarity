'use client';

import React from 'react';
import {
  Shield,
  FileText,
  Scale,
  MessageSquare,
  CheckSquare,
  ArrowRight,
  Sparkles,
  BookOpen,
  AlertOctagon,
  Users,
  Briefcase,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
  onTrySampleRental: () => void;
  onTrySampleOffer: () => void;
  onGoToCompare: () => void;
}

export function LandingHero({
  onGetStarted,
  onTrySampleRental,
  onTrySampleOffer,
  onGoToCompare,
}: LandingHeroProps) {
  return (
    <div className="space-y-16 py-6 sm:py-10 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-indigo-800/40">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
            <span>AI-Powered Legal Document Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Understand What You’re Signing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">
              Before You Sign.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Clarity translates dense leases, employment contracts, NDAs, and service agreements into plain, everyday English. Flag hidden penalties, compare contract terms, and know the right questions to ask a lawyer.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              <span>Get Started / Upload Contract</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onGoToCompare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base rounded-xl transition-all border border-slate-700 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-slate-400"
            >
              <Scale className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>Compare Two Contracts</span>
            </button>
          </div>

          {/* Instant Demo Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Or test with pre-loaded demo contracts:</span>
            <button
              type="button"
              onClick={onTrySampleRental}
              className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition-colors"
            >
              Sample Rental Lease
            </button>
            <button
              type="button"
              onClick={onTrySampleOffer}
              className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition-colors"
            >
              Sample Offer Letter
            </button>
          </div>

          {/* Trust Banner Inside Hero */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Zero-Storage Privacy by Default</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Grounded Clause Citations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Instant PDF Action Packs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Everyday People Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for People Who Don’t Speak Legalese
          </h2>
          <p className="text-sm text-slate-600">
            You shouldn’t need a law degree to understand your own rights, obligations, and financial risks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-card transition-shadow">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl w-fit">
              <Home className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Tenants & Renters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Spot unfair deposit retention rules, invasive entry clauses, auto-renewal traps, and structural repair liabilities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-card transition-shadow">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
              <Briefcase className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Employees & Job Seekers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unpack signing bonus clawbacks, broad personal IP claims, asymmetric notice periods, and restrictive non-competes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-card transition-shadow">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
              <Users className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Freelancers & Contractors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clarify milestone payment terms, scope creep liabilities, indemnity waivers, and work-for-hire copyright ownership.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-card transition-shadow">
            <div className="p-3 bg-sky-50 text-sky-700 rounded-xl w-fit">
              <Shield className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Small Business Owners</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review vendor contracts, non-disclosure agreements, and commercial service covenants without costly hourly retainers.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Capabilities Section */}
      <section className="bg-slate-100/70 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Comprehensive Document Review
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Clarity Protects You
          </h2>
          <p className="text-sm text-slate-600">
            Every feature is built around empowering everyday signers with transparent, actionable legal intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl w-fit">
              <AlertOctagon className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Clause-by-Clause Risk Breakdown</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Categorizes each clause into Standard, Worth Reviewing, or Potential Red Flag, explaining in plain English what the clause actually means for you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
              <Scale className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Semantic Contract Comparison</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare two different offers or lease versions side-by-side. Highlights which contract provides better protections and lower penalties.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl w-fit">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Grounded Document Q&A</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask direct questions like “Can the landlord withhold my deposit?” Answers cite specific clauses and guarantee zero hallucinated facts.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
              <CheckSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pre-Signing Checklist & PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatically creates a customized checklist and a curated list of questions to ask a lawyer during consultation. Exportable as a PDF.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl w-fit">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Interactive Legal Glossary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click on terms like Indemnity, Force Majeure, Severability, or Liquidated Damages anywhere in the app to reveal simple 1-sentence explanations.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl w-fit mb-3">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">All Popular Contract Types</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepts PDF, Word (DOCX), and text files. Works for residential leases, job offers, freelancing contracts, and non-disclosure agreements.
              </p>
            </div>
            <button
              type="button"
              onClick={onGetStarted}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>Upload a contract now</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-indigo-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Ready to review your contract with complete confidence?
        </h2>
        <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
          Take 2 minutes to scan your agreement before signing. No account required.
        </p>
        <button
          type="button"
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-bold text-base rounded-xl shadow-md hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Start Reviewing Now</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
