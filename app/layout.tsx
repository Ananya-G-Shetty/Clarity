import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Clarity — AI-Powered Legal Document Assistant',
  description:
    'Understand, compare, and navigate legal contracts like leases, employment offers, and NDAs in plain English — without replacing a licensed attorney.',
  keywords: [
    'legal assistant',
    'contract review',
    'lease agreement',
    'offer letter review',
    'clause risk analyzer',
    'plain English legal',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Permanent Legal Disclaimer Banner on Every Screen */}
        <DisclaimerBanner />

        {/* Main Content Landmark */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Global Accessible Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} Clarity Legal Assistant. Designed for everyday tenants, employees, and small business owners.
            </p>
            <p className="text-slate-500 text-[11px] text-center sm:text-right">
              Permanent Notice: Clarity provides legal information, not licensed legal advice. Consult an attorney for binding legal counsel.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
