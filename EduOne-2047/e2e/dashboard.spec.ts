import { test, expect } from '@playwright/test';

test('Dashboard KPI: Super Admin sees all', async ({ page }) => {
  await page.goto('/app');
  await page.fill('input[type="text"]', 'EMP-739');
  await page.fill('input[type="password"]', 'vikram@739');
  await page.click('button:has-text("Initialize Session")');
  
  await expect(page.locator('text="Super Admin"').first()).toBeVisible({ timeout: 10000 });
  
  // Verify KPIs
  const dashboardText = await page.locator('main').innerText();
  expect(dashboardText).toContain('Total Students');
  expect(dashboardText).toContain('Total Teachers');
  expect(dashboardText).toContain('Avg Attendance');
});

test('Dashboard KPI: Class Teacher sees own class only', async ({ page }) => {
  await page.goto('/app');
  await page.fill('input[type="text"]', 'TCH-202');
  await page.fill('input[type="password"]', 'priya@202');
  await page.click('button:has-text("Initialize Session")');
  
  await expect(page.locator('text="Class Teacher"').first()).toBeVisible({ timeout: 10000 });
  
  // Verify KPIs
  const dashboardText = await page.locator('main').innerText();
  expect(dashboardText).toContain('Total Students'); // In their class
  expect(dashboardText).not.toContain('Total Teachers');
  expect(dashboardText).not.toContain('Total Fees');
});

test('Dashboard KPI: Accountant sees fee data', async ({ page }) => {
  await page.goto('/app');
  await page.fill('input[type="text"]', 'ACT-511');
  await page.fill('input[type="password"]', 'rahul@511');
  await page.click('button:has-text("Initialize Session")');
  
  await expect(page.locator('text="Accountant"').first()).toBeVisible({ timeout: 10000 });
  
  // Verify KPIs
  const dashboardText = await page.locator('main').innerText();
  expect(dashboardText).toContain('Total Fees');
  expect(dashboardText).toContain('Total Collected');
});
