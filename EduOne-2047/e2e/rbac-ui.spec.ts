import { test, expect } from '@playwright/test';

const USERS = [
  { id: 'EMP-739', name: 'Super Admin', role: 'Super Admin' },
  { id: 'EMP-902', name: 'Principal', role: 'Principal' },
  { id: 'TCH-202', name: 'Class Teacher', role: 'Class Teacher' },
  { id: 'ACT-511', name: 'Accountant', role: 'Accountant' },
  { id: 'REC-114', name: 'Receptionist', role: 'Receptionist' }
];

for (const user of USERS) {
  test(`RBAC UI Visibility: ${user.name}`, async ({ page }) => {
    await page.goto('/');
    
    // Fill credentials
    await page.fill('input[type="text"]', user.id);
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Sign In to Operations")');
    
    // Wait for load
    await expect(page.locator(`text=${user.role}`).first()).toBeVisible({ timeout: 10000 });
    
    const navText = await page.locator('nav').innerText();

    if (user.role === 'Class Teacher') {
      expect(navText).toContain('Students & Roster');
      expect(navText).toContain('Attendance');
      expect(navText).toContain('Timetable');
      expect(navText).not.toContain('Fee Management');
      
      // Try to navigate directly to an unauthorized route
      await page.goto('/app?module=fees');
      await expect(page.locator('text="Fee Management"')).toBeHidden();
    }
    
    if (user.role === 'Accountant') {
      expect(navText).toContain('Fee Management');
      expect(navText).toContain('Documents');
      expect(navText).not.toContain('Attendance');
      
      await page.goto('/app?module=attendance');
      await expect(page.locator('text="Mark All Present"')).toBeHidden();
    }
    
    if (user.role === 'Receptionist') {
      expect(navText).toContain('Documents');
      expect(navText).not.toContain('Fee Management');
      expect(navText).not.toContain('Attendance');
    }
  });
}
