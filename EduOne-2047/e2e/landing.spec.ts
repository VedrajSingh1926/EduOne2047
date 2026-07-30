import { test, expect } from '@playwright/test';

test('Landing Page: Check login roles and UI', async ({ page }) => {
  await page.goto('/');
  
  // Verify standard login UI elements
  await expect(page.locator('text="Operations Platform"')).toBeVisible();
  await expect(page.locator('text="Sign In to Operations"')).toBeVisible();
  
  // Check that all 5 roles are represented in the quick login section
  const roles = ['Super Admin', 'Principal', 'Class Teacher', 'Accountant', 'Receptionist'];
  for (const role of roles) {
    await expect(page.locator(`text=${role}`).first()).toBeVisible();
  }
});
