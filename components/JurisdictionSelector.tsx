'use client';

import React from 'react';
import { Globe } from 'lucide-react';

interface JurisdictionSelectorProps {
  value: string;
  onChange: (jurisdiction: string) => void;
}

export function JurisdictionSelector({ value, onChange }: JurisdictionSelectorProps) {
  const jurisdictions = [
    { id: 'India', label: 'India (Default)' },
    { id: 'United States', label: 'United States (General)' },
    { id: 'United Kingdom', label: 'United Kingdom (E&W)' },
    { id: 'Global', label: 'Global / Standard' },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/80 px-2 py-1 rounded-lg text-xs">
      <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
      <label htmlFor="jurisdiction-select" className="sr-only">
        Select Legal Jurisdiction
      </label>
      <select
        id="jurisdiction-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-slate-800 font-medium text-xs focus:outline-none cursor-pointer pr-1"
        title="Select legal framework context"
      >
        {jurisdictions.map((j) => (
          <option key={j.id} value={j.id}>
            {j.label}
          </option>
        ))}
      </select>
    </div>
  );
}
