import '@testing-library/jest-dom';
import React from 'react';

// Polyfill window.scrollTo and scrollIntoView
if (typeof window !== 'undefined') {
  window.scrollTo = jest.fn();
  if (window.HTMLElement) {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  }
}

// Polyfill ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock lucide-react icons for fast, error-free DOM tests
jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (_, prop) => {
        const MockIcon = (props: React.HTMLAttributes<HTMLSpanElement>) => {
          return React.createElement('span', {
            'data-testid': `icon-${String(prop)}`,
            'aria-hidden': 'true',
            ...props,
          });
        };
        MockIcon.displayName = `LucideIcon(${String(prop)})`;
        return MockIcon;
      },
    }
  );
});
