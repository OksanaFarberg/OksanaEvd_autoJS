import { test, expect } from '@playwright/test';

import 'dotenv/config';

const baseURL = 'https://smotreshka.tv';
const login = process.env.TEST_SMOTRESHKA_LOGIN;
const password = process.env.TEST_SMOTRESHKA_PASS;

const authStateFile = './e2e/20_hw_tests/auth.json';

test.describe('Smotreshka UI Tests', () => {
  test('Авторизация', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(`${baseURL}/login`);
    await page.waitForLoadState('load');

    await page.getByText('По логину').click();
    await page.getByRole('textbox', { name: 'Логин' }).fill(login);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
   
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.waitForTimeout(18000); // Ждем 18 секунд

    await page.waitForLoadState('load');
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByRole('button', { name: 'Перейти к просмотру' }).click();
    await page.waitForLoadState('load');
    
    // Сохраняем состояние авторизации в файл
    await context.storageState({ path: authStateFile });
    await expect(page).toHaveURL(baseURL);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await expect(page.getByText('saymyname')).toBeVisible();
  });

  test('Проверка работы поиска', async ({ browser }) => {
    // Используем сохраненное состояние авторизации
    const context = await browser.newContext({
      storageState: authStateFile,  // Загружаем состояние из файла
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/channels/now`);
    await page.getByRole('textbox', { name: 'Что хотите посмотреть?' }).fill('пер');
    
    await page.getByRole('textbox', { name: 'Что хотите посмотреть?' }).press('Enter');
    await expect(page.getByRole('heading', { name: 'Каналы' })).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Первый канал');
  });

  test('Проверяем загрузку страницы Кинотеатры', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: authStateFile,  // Загружаем состояние из файла
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/vod`);
    await page.getByRole('link', { name: 'Кинотеатр' }).click();
    await expect(page.getByRole('heading', { name: 'Кинотеатр' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'AMEDIATEKA' })).toBeVisible();
  });

  test('Проверяем загрузку страницы Моё', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: authStateFile,  // Загружаем состояние из файла
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/my`);
    await page.waitForLoadState('load');

     // Проверка наличия заголовка с нужным  текстом
  const header = await page.locator('h1');
  await expect(header).toHaveText('Моё');

  
  });

  test('Проверяем загрузку страницы Профилей', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: authStateFile,  // Загружаем состояние из файла
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/personal/profiles`);
    await page.waitForLoadState('load');

    await page.getByRole('button', { name: 'Создать профиль' }).click();
    await page.getByRole('textbox', { name: 'Название' }).click();
    await page.getByRole('textbox', { name: 'Название' }).fill('pro');
    await page.locator('.clickable-overlay').click();
    await page.locator('a').filter({ hasText: 'Обычный' }).click();
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await page.waitForTimeout(2000); // Ждем 2 секунды

    if(await page.getByRole('textbox', { name: 'Пароль' }).isVisible()) {
      await page.getByRole('textbox', { name: 'Пароль' }).click();
      await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
    }
 
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await page.waitForTimeout(12000);
    await expect(page.getByText('pro')).toBeVisible();
  
  });

});

    
  

  