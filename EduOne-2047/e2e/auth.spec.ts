import { test, expect } from '@playwright/test';

const USERS = [
  { id: 'EMP-739', name: 'Super Admin', role: 'Super Admin' },
  { id: 'EMP-902', name: 'Principal', role: 'Principal' },
  { id: 'TCH-202', name: 'Class Teacher', role: 'Class Teacher' },
  { id: 'ACT-511', name: 'Accountant', role: 'Accountant' },
  { id: 'REC-114', name: 'Receptionist', role: 'Receptionist' }
];

for (const user of USERS) {
  test(`Login Flow: ${user.name}`, async ({ page }) => {
    await page.goto('/');
    
    // Fill credentials
    await page.fill('input[type="text"]', user.id);
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Sign In to Operations")');
    
    // Confirm correct dashboard/role appears
    await expect(page.locator(`text=${user.role}`).first()).toBeVisible({ timeout: 10000 });
    
    // Confirm auth persistence (re-navigating doesn't logout)
    await page.goto('/app');
    await expect(page.locator(`text=${user.role}`).first()).toBeVisible({ timeout: 10000 });
    
    // Check claims logic (in this case mock auth local storage)
    const storedUser = await page.evaluate(() => localStorage.getItem('eduone_user'));
    expect(storedUser).toContain(user.id);
    expect(storedUser).toContain(user.role);
    
    // Logout
    await page.click('button[title="Log out securely"]');
    
    // Confirm logged out
    await expect(page.locator('text="Sign In to Operations"')).toBeVisible();
    
    // Confirm session clears by navigating back
    await page.goto('/app');
    await expect(page.locator('text="Sign In to Operations"')).toBeVisible();
  });
}

test('Login Flow: Invalid Password', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="text"]', 'EMP-739');
  await page.fill('input[type="password"]', 'wrongpassword');
  await page.click('button:has-text("Sign In to Operations")');
  
  await expect(page.locator('text="Invalid Staff ID or password"')).toBeVisible({ timeout: 5000 });
});
