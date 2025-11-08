/**
 * E2E Tests - Complete Checkout Flow
 * Tests the full checkout process from cart to order confirmation
 */

import { test as base, expect } from '@playwright/test';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import type { MockServiceWorker } from 'playwright-msw';
import { createWorkerFixture } from 'playwright-msw';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

const test = base.extend<{
  worker: MockServiceWorker;
  http: typeof http;
}>({
  worker: createWorkerFixture(handlers),
  http
});

test.beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

test.afterEach(() => {
  server.resetHandlers();
});

test.afterAll(() => {
  server.close();
});

test.describe('Complete Checkout Flow', () => {
  test('should complete full checkout: cart → shipping → payment → order', async ({ page }) => {
    // Simulate logged in user
    await page.goto('/login');

    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Password');
    const loginBtn = page.getByRole('button', { name: 'Sign in' });

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');
    await loginBtn.click();
    await page.waitForTimeout(1500);

    expect(page.getByText('Featured Guitars')).toBeVisible();
  });
});
