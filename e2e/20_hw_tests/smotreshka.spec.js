// import playwright from 'playwright';
import { test, expect } from '@playwright/test';
import 'dotenv/config';
 

const baseURL = 'https://smotreshka.tv';

const login = process.env.TEST_SMOTRESHKA_LOGIN;
const password = process.env.TEST_SMOTRESHKA_PASS;

console.log(login);

test.describe('Smotreshka UI Tests', () => {
  
  test('Авторизация', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    // Ожидаем, пока страница загрузится
  await page.waitForLoadState('load');

    await page.getByText('По логину').click();
    await page.getByRole('textbox', { name: 'Логин' }).click();
    await page.getByRole('textbox', { name: 'Логин' }).fill(login);
    await page.getByRole('textbox', { name: 'Пароль' }).click();
    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
   
    await page.getByRole('button', { name: 'Далее' }).click();
      // Ожидание полной загрузки страницы
  await page.waitForLoadState('load', { timeout: 60000 });
    await page.getByRole('button', { name: 'Далее' }).click({ timeout: 60000 });
    await page.getByRole('button', { name: 'Перейти к просмотру' }).click({ timeout: 60000 });
    // Ожидаем, пока страница загрузится
  await page.waitForLoadState('load');
    await expect(page).toHaveURL(baseURL);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    
    await expect(page.getByText('saymyname')).toBeVisible();
  });

 

  });
   

// =------

//   test('Выход из аккаунта', async ({ page }) => {
//     await page.goto(baseURL);
//     await page.locator('[data-testid="btn-profile"]').click();
//     await page.locator('[data-testid="btn-logout"]').click();
//     await expect(page.locator('[data-testid="btn-login"]')).toBeVisible();
//   });

//   test('Просмотр телеканала', async ({ page }) => {
//     await page.goto(baseURL);
//     await page.locator('[data-testid="channel-card"]').first().click();
//     await expect(page.locator('[data-testid="video-player"]')).toBeVisible();
//   });

//   test('Переключение каналов', async ({ page }) => {
//     await page.goto(baseURL);
//     await page.locator('[data-testid="channel-card"]').first().click();
//     await page.locator('[data-testid="btn-next-channel"]').click();
//     await expect(page.locator('[data-testid="video-player"]')).toBeVisible();
//   });

//   test('Поиск телеканала', async ({ page }) => {
//     await page.goto(baseURL);
//     const channelName = 'Первый канал';
//     await page.locator('[data-testid="search-input"]').fill(channelName);
//     await expect(page.locator('[data-testid="search-results"]')).toContainText(channelName);
//   });

