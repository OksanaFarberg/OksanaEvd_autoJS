import { test, expect } from '@playwright/test';

 
import config from './config.vikunja.js';


const { login, password } = config.credential;
const { url } = config;


test('Успешная авторизация', async ({ page }) => {
    await page.goto(`${url}/login`);
    await page.locator('#username').click();
    await page.locator('#username').fill(login);
    await page.locator('#password').click();
    await page.locator('#password').fill(password);
    await page.locator('button', { hasText: 'Login' }).click();
    await expect(page).toHaveURL(url);

  });

const authStateFile = './e2e/21_hw_tests/authVikunja.json';

// Добавляю состояние браузера и страницы, чтобы не открывать на каждый тест заново

let context;
let page;


test.describe('Тесты сайта Викунья ', () => {
  test.beforeAll(async ({ browser }) => {
    // Создаем один контекст на все тесты
    context = await browser.newContext();
    page = await context.newPage();

    // Авторизация перед всеми тестами
    await page.goto(`${url}/login`);
    await page.locator('#username').click();
    await page.locator('#username').fill(login);
    await page.locator('#password').click();
    await page.locator('#password').fill(password);
    await page.locator('button', { hasText: 'Login' }).click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(url);
     
    // Сохраняем авторизованное состояние
    await context.storageState({ path: authStateFile });
  });

  test('test7', async () => {

    await page.locator('.task-add').click()
    await page.locator('.task-add').fill('задача1')
     
      });

  // test.afterAll(async () => {
  //     // Закрываем браузерный контекст после всех тестов
  //     await context.close();
  //   });
  });
// test('test2', async ({ page }) => {
//     await page.getByRole('textbox', { name: 'Добавить задачу…' }).click();
//     await page.getByRole('textbox', { name: 'Добавить задачу…' }).fill('задача-номер1');
//     await page.getByRole('button', { name: 'Добавить', exact: true }).click();
//     await expect(page.getByRole('link', { name: 'задача-номер' })).toBeVisible();
     
// })
  
// test('test3', async ({ page }) => {
//   await page.locator('div').filter({ hasText: /^Inboxзадача-номер1$/ }).click();
//   await expect(page.getByRole('heading', { name: 'задача-номер' })).toBeVisible();
//   await page.getByRole('heading', { name: 'Входящие' }).click();
//   await page.getByRole('heading', { name: 'Описание' }).click();
// });

 
// test('test4', async ({ page }) => {
//   await page.locator('.tiptap__editor').first().click();
//   await page.getByRole('textbox').first().fill('описание-к-задаче1');
//   await page.getByRole('button', { name: 'Сохранить' }).click();
//   await expect(page.getByRole('main')).toMatchAriaSnapshot(`- paragraph: описание-к-задаче1`);
//   await expect(page.getByText('описание-к-задаче')).toBeVisible();
//   await page.locator('.is-two-thirds > div:nth-child(2)').click();
// });


// test('test5', async ({ page }) => {
//   await page.locator('.field > div > .tiptap__editor').click();
//   await page.getByRole('textbox').filter({ hasText: /^$/ }).fill('ввод-комментариев');
//   await page.getByRole('button', { name: 'Комментировать' }).click();
//   await expect(page.getByText('demoless than a minute ago')).toBeVisible();
//   await page.getByRole('textbox').filter({ hasText: 'ввод-комментариев' }).click();
//   await page.locator('.comments').click();
// });

 
// test('test6', async ({ page }) => {
//   await page.goto('https://try.vikunja.io/tasks/413');
//   await page.getByRole('link', { name: 'Предстоящие задачи' }).click();
//   await page.getByRole('link', { name: 'Проекты' }).click();
//   await page.getByRole('link', { name: 'Метки' }).click();
//   await page.getByRole('link', { name: 'Команды' }).click();
// });

// test('test7', async ({ page }) => {
//     await page.goto('https://try.vikunja.io/tasks/413');
//     await page.getByRole('link', { name: 'Предстоящие задачи' }).click();
//     await page.getByRole('link', { name: 'Проекты' }).click();
//     await page.getByRole('link', { name: 'Метки' }).click();
//     await page.getByRole('link', { name: 'Команды' }).click();
//   });