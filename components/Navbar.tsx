'use client';

import React from 'react';
import { EngineStatus } from '@/types';
import { JurisdictionSelector } from './JurisdictionSelector';
import {
  Scale,
  FileText,
  ArrowRightLeft,
  MessageSquare,
  CheckSquare,
  Cpu,
  UploadCloud,
  Key,
  Home,
} from 'lucide-react';

export type ActiveTab = 'landing' | 'upload' | 'summary' | 'compare' | 'chat' | 'checklist';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  hasDocument: boolean;
  engineStatus: EngineStatus | null;
  jurisdiction: string;
  onJurisdictionChange: (jurisdiction: string) => void;
  onOpenApiKeyModal?: () => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  hasDocument,
  engineStatus,
  jurisdiction,
  onJurisdictionChange,
  onOpenApiKeyModal,
}: NavbarProps) {
  const isGemini = engineStatus?.activeEngine === 'gemini';

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; disabled?: boolean }[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload Contract', icon: UploadCloud },
    { id: 'summary', label: 'Summary & Clauses', icon: FileText, disabled: !hasDocument },
    { id: 'compare', label: 'Compare Contracts', icon: ArrowRightLeft },
    { id: 'chat', label: 'Document Q&A', icon: MessageSquare, disabled: !hasDocument },
    { id: 'checklist', label: 'Checklist & PDF', icon: CheckSquare, disabled: !hasDocument },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onTabChange('landing')}
              className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-indigo-600 rounded-lg p-1"
              title="Clarity Home"
            >
              <div className="p-2 bg-slate-950 text-indigo-400 rounded-xl shadow-xs">
                <Scale className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-950 block leading-tight">
                  Clarity
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block leading-none">
                  Legal Document Assistant
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => onTabChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-indigo-900 shadow-2xs'
                      : item.disabled
                      ? 'text-slate-400 cursor-not-allowed opacity-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities (Engine Status, Jurisdiction Selector) */}
          <div className="flex items-center gap-2.5">
            {/* Real-time Engine Status Badge */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-[1.02] cursor-pointer ${
                isGemini
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Click to configure Gemini API Key"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isGemini ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
                aria-hidden="true"
              />
              <Cpu className="w-3 h-3 opacity-70" aria-hidden="true" />
              <span>{isGemini ? 'Live Gemini' : 'Local Fallback'}</span>
              <Key className="w-3 h-3 text-slate-400 ml-0.5" aria-hidden="true" />
            </button>

            {/* Jurisdiction Selector */}
            <div className="block">
              <JurisdictionSelector value={jurisdiction} onChange={onJurisdictionChange} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 overflow-x-auto text-[11px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => onTabChange(item.id)}
                className={`inline-flex flex-col items-center gap-1 px-2 py-1 font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 font-bold'
                    : item.disabled
                    ? 'text-slate-300 opacity-40'
                    : 'text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
