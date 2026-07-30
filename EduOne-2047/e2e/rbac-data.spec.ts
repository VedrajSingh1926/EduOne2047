import { test, expect } from '@playwright/test';

// These tests verify data-layer enforcement by trying to interact directly with Firebase from the console
// NOTE: Since the application currently uses Mock Authentication (Option B) with open database rules, 
// these data-layer protections will actually allow the writes. Thus, these tests are expected to fail 
// to ensure visibility into the open nature of the database.

test('RBAC Data-Layer: Class Teacher cannot write to fees', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'TCH-202'); // Class Teacher
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  await expect(page.locator('text=Class Teacher').first()).toBeVisible({ timeout: 10000 });

  // Try to write to fees directly using Firebase in the window
  const result = await page.evaluate(async () => {
    try {
      // @ts-ignore
      const { ref, set } = await import('firebase/database');
      // @ts-ignore
      await set(ref(window.db, 'fees/test-unauthorized'), { amount: 100 });
      return 'success';
    } catch (e: any) {
      return e.message;
    }
  });

  // We expect this to fail with a permission denied error
  expect(result).toContain('PERMISSION_DENIED');
});

test('RBAC Data-Layer: Receptionist cannot write to fees', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'REC-114'); // Receptionist
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  await expect(page.locator('text=Receptionist').first()).toBeVisible({ timeout: 10000 });

  const result = await page.evaluate(async () => {
    try {
      // @ts-ignore
      const { ref, set } = await import('firebase/database');
      // @ts-ignore
      await set(ref(window.db, 'fees/test-unauthorized-2'), { amount: 200 });
      return 'success';
    } catch (e: any) {
      return e.message;
    }
  });

  expect(result).toContain('PERMISSION_DENIED');
});

test('RBAC Data-Layer: Accountant cannot write to timetable', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'ACT-511'); // Accountant
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In to Operations")');
  await expect(page.locator('text=Accountant').first()).toBeVisible({ timeout: 10000 });

  const result = await page.evaluate(async () => {
    try {
      // @ts-ignore
      const { ref, set } = await import('firebase/database');
      // @ts-ignore
      await set(ref(window.db, 'timetable/test-unauthorized-3'), { subject: 'Math' });
      return 'success';
    } catch (e: any) {
      return e.message;
    }
  });

  expect(result).toContain('PERMISSION_DENIED');
});
