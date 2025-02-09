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
// Тут происходит разлогинивание, как избежать,чтобы не было его?? 
  test('Запуск телеканала', async ({ page }) => {
    await page.goto(`${baseURL}/channels/now`);
   
  });
    
  });

  