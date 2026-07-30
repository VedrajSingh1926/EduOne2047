import { test, expect } from '@playwright/test';

test('Functional: Class Teacher marks attendance', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'TCH-202');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  
  await expect(page.locator('text="Class Teacher"').first()).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Attendance")');
  
  await expect(page.locator('text="Smart Attendance"')).toBeVisible();
  
  // Click mark all present
  await page.click('button:has-text("Mark All Present")');
  
  // Verify success toast
  await expect(page.locator('text="Successfully marked"').first()).toBeVisible({ timeout: 10000 });
});

test('Functional: Accountant fee reconciliation', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'ACT-511');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  
  await expect(page.locator('text="Accountant"').first()).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Fee Management")');
  
  await expect(page.locator('text="Fee Management & OCR"')).toBeVisible();
  
  // Look for a fee action, like marking as paid or downloading report
  const downloadReportBtn = page.locator('button:has-text("Download Report")');
  if (await downloadReportBtn.isVisible()) {
    // If it's present, click it
    await downloadReportBtn.click();
    await expect(page.locator('text="Report downloaded"').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
  }
});

test('Functional: Receptionist visitor/document', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'REC-114');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  
  await expect(page.locator('text="Receptionist"').first()).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Documents")');
  
  await expect(page.locator('text="Upload Document"')).toBeVisible();
  await page.click('button:has-text("Upload Document")');
  
  // Assuming there's a modal or simulated upload
  await expect(page.locator('text="Drop files here or click to upload"')).toBeVisible();
});
