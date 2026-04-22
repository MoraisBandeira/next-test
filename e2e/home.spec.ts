import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/next/i);
});

test('renders get started text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/Get started by editing/i)).toBeVisible();
});
