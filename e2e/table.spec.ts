import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Table' }).click();
  await expect(page.getByRole('row', { name: '# Nome E-mail Site Ações' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Última página' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Primeira página' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Próxima página' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Página anterior' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Paginação' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Usuários' })).toBeVisible();
});