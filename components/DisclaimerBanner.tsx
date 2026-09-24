'use client';

import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <aside
      aria-label="Legal Information Disclaimer"
      className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs md:text-sm text-amber-950 flex items-center justify-center gap-2 shadow-xs transition-colors"
    >
      <Shield className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
      <p className="text-center font-medium">
        <span className="font-semibold text-amber-900">Legal Disclaimer:</span> Clarity provides legal information to
        help you understand documents. It is not a substitute for advice from a licensed attorney.
      </p>
    </aside>
  );
}
