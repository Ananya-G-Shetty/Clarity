'use client';

import React from 'react';
import { RiskLevel } from '@/types';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, className = '', size = 'md' }: RiskBadgeProps) {
  let badgeConfig = {
    label: 'Standard',
    ariaText: 'Risk Level: Standard. Conforms with customary contractual practices.',
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    icon: CheckCircle2,
    iconColor: 'text-emerald-700',
  };

  if (level === 'review') {
    badgeConfig = {
      label: 'Worth Reviewing',
      ariaText: 'Risk Level: Worth Reviewing. Asymmetric obligations or tight deadlines require caution.',
      bg: 'bg-amber-50 text-amber-900 border-amber-300',
      icon: AlertTriangle,
      iconColor: 'text-amber-700',
    };
  } else if (level === 'red_flag') {
    badgeConfig = {
      label: 'Potential Red Flag',
      ariaText: 'Risk Level: Potential Red Flag. Unusual vs. standard practice and may be worth asking a lawyer about.',
      bg: 'bg-rose-50 text-rose-900 border-rose-300',
      icon: AlertOctagon,
      iconColor: 'text-rose-700',
    };
  }

  const Icon = badgeConfig.icon;
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs'
      : size === 'lg'
      ? 'px-3.5 py-1.5 text-sm font-semibold'
      : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      role="status"
      aria-label={badgeConfig.ariaText}
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs font-medium tracking-wide ${badgeConfig.bg} ${sizeClasses} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{badgeConfig.label}</span>
    </span>
  );
}
