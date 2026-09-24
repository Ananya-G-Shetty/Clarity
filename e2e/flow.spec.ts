import { test, expect } from '@playwright/test';

test.describe('Clarity Legal Assistant E2E Core Flows', () => {
  test('Complete Demo Flow: Loads document, displays summary with risk breakdown, asks Q&A question, and receives cited answer', async ({
    page,
  }) => {
    // 1. Visit Home Page
    await page.goto('/');

    // Verify Permanent Disclaimer is visible on load
    await expect(page.locator('aside[aria-label="Legal Information Disclaimer"]')).toBeVisible();
    await expect(page.locator('text=It is not a substitute for advice from a licensed attorney')).toBeVisible();

    // 2. Check Document Summary is rendered
    await expect(page.locator('text=Clause-by-Clause Analysis')).toBeVisible();
    await expect(page.locator('text=Potential Red Flags')).toBeVisible();

    // 3. Navigate to Compare Contracts tab
    await page.click('button:has-text("Compare Contracts")');
    await expect(page.locator('text=Contract Risk & Favorability Comparison')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // 4. Navigate to Document Q&A tab
    await page.click('button:has-text("Document Q&A")');
    await expect(page.locator('text=Strict Document-Grounded Q&A')).toBeVisible();

    // 5. Ask a question about deposit
    const inputField = page.locator('#chat-input-field');
    await inputField.fill('Can the landlord withhold my deposit without receipts?');
    await page.click('button[title="Send Question"]');

    // 6. Verify Cited answer appears
    await expect(page.locator('text=Cited Document Clauses:')).toBeVisible({ timeout: 10000 });

    // 7. Navigate to Checklist & PDF tab
    await page.click('button:has-text("Checklist & PDF")');
    await expect(page.locator('text=Pre-Signing Checklist & Questions for Lawyer')).toBeVisible();
    await expect(page.locator('button:has-text("Download PDF Action Pack")')).toBeVisible();
  });

  test('Graceful Failure Flow: Uploading unsupported file triggers clear error without crashing', async ({
    page,
  }) => {
    await page.goto('/');

    // Navigate to Documents & Upload tab
    await page.click('button:has-text("Documents & Upload")');
    await expect(page.locator('text=Upload Your Own Contract for Analysis')).toBeVisible();

    // Set file input to an unsupported file type
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('text=Click to browse or drag and drop your agreement here');
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles({
      name: 'malicious_script.sh',
      mimeType: 'application/x-sh',
      buffer: Buffer.from('#!/bin/bash\necho "invalid"'),
    });

    // Verify friendly error alert is displayed
    await expect(page.locator('role=alert')).toBeVisible();
    await expect(page.locator('text=Unsupported file type')).toBeVisible();
  });
});
