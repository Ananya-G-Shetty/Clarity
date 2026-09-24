'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getGlossaryDefinition } from '@/lib/glossary';
import { BookOpen, Info, X } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
  customDefinition?: string;
  customExample?: string;
}

export function GlossaryTerm({
  term,
  children,
  customDefinition,
  customExample,
}: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const info = getGlossaryDefinition(term);

  const definition = customDefinition || info?.definition || `A formal legal provision governing the rights and obligations of parties regarding ${term}.`;
  const example = customExample || info?.plainEnglishExample;
  const displayTitle = info?.term || term;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={`Click to view plain-English definition of "${displayTitle}"`}
        className="inline-flex items-center gap-0.5 font-medium text-indigo-700 underline decoration-indigo-400 decoration-dotted underline-offset-3 hover:text-indigo-900 hover:decoration-solid focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:rounded-xs cursor-help transition-colors"
      >
        <span>{children || term}</span>
        <BookOpen className="w-3 h-3 text-indigo-500 shrink-0 inline ml-0.5 opacity-80" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={`Plain English Definition: ${displayTitle}`}
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 p-3.5 bg-slate-900 text-white rounded-lg shadow-xl text-left text-xs border border-slate-700 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-semibold text-indigo-300 flex items-center gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              {displayTitle}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded-sm"
              aria-label="Close definition tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="mt-2 text-slate-200 leading-relaxed">{definition}</p>

          {example && (
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-amber-200/90 bg-amber-950/30 p-2 rounded-sm">
              <strong className="text-amber-300">Plain English Example: </strong>
              {example}
            </div>
          )}

          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-slate-900" />
        </div>
      )}
    </span>
  );
}
