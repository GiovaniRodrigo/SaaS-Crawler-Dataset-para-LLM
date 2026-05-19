import { test, expect } from '@playwright/test';

test('landing page has DataCrawl brand and CTA', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DataCrawl/);

  // Check for the main headline
  await expect(page.getByText('Transforme sites em datasets prontos para LLM')).toBeVisible();

  // Check for the "Começar agora" button
  const startButton = page.getByRole('link', { name: 'Começar agora' }).first();
  await expect(startButton).toBeVisible();
});

test('login page is accessible', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText('Entrar na conta')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Senha')).toBeVisible();
});
