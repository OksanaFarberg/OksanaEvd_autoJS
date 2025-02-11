import { test, expect } from "@playwright/test";

import "dotenv/config";

const baseURL = "https://smotreshka.tv";
const login = process.env.TEST_SMOTRESHKA_LOGIN;
const password = process.env.TEST_SMOTRESHKA_PASS;

const authStateFile = "./e2e/20_hw_tests/auth.json";

// Добавляю состояние браузера и страницы, чтобы не открывать на каждый тест заново

let context;
let page;

test.describe("Smotreshka UI Tests", () => {
  test.beforeAll(async ({ browser }) => {
    // Создаем один контекст на все тесты
    context = await browser.newContext();
    page = await context.newPage();

    // Авторизация перед всеми тестами
    await page.goto(`${baseURL}/login`);
    await page.waitForLoadState("load");

    await page.getByText("По логину").click();
    await page.getByRole("textbox", { name: "Логин" }).fill(login);
    await page.getByRole("textbox", { name: "Пароль" }).fill(password);
    await page.getByRole("button", { name: "Далее" }).click();
    await page.waitForTimeout(2000);

    await page.waitForLoadState("load");
    await page.getByRole("button", { name: "Далее" }).click();
    await page.getByRole("button", { name: "Перейти к просмотру" }).click();
    await page.waitForLoadState("load");

    // Сохраняем авторизованное состояние
    await context.storageState({ path: authStateFile });

    await expect(page).toHaveURL(baseURL);
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await expect(page.getByText("saymyname")).toBeVisible();
  });

  test("Проверка работы поиска", async () => {
    // Используем сохраненное состояние авторизации
    // const context = await browser.newContext({
    //   storageState: authStateFile,  // Загружаем состояние из файла
    // });
    // const page = await context.newPage();
    await page.goto(`${baseURL}/channels/now`);
    await page.waitForTimeout(3000);
    await page
      .getByRole("textbox", { name: "Что хотите посмотреть?" })
      .fill("пер");

    await page
      .getByRole("textbox", { name: "Что хотите посмотреть?" })
      .press("Enter");
    await expect(page.getByRole("heading", { name: "Каналы" })).toBeVisible();
    await expect(page.getByRole("main")).toContainText("Первый канал");
  });

  test("Проверяем загрузку страницы Кинотеатры", async () => {
    // const context = await browser.newContext({
    //   storageState: authStateFile,  // Загружаем состояние из файла
    // });
    // const page = await context.newPage();
    await page.goto(`${baseURL}/vod`);
    await page.waitForTimeout(2000);
    await page.getByRole("link", { name: "Кинотеатр" }).click();
    await expect(
      page.getByRole("heading", { name: "Кинотеатр" })
    ).toBeVisible();
  });

  test("Проверяем загрузку страницы Моё", async () => {
    // const context = await browser.newContext({
    //   storageState: authStateFile,  // Загружаем состояние из файла
    // });
    //  const page = await context.newPage();
    await page.goto(`${baseURL}/my`);
    //  await page.waitForTimeout(3000);
    // await page.waitForLoadState('load');

    // Проверка наличия заголовка с нужным  текстом
    const header = await page.locator("h1");
    await expect(header).toHaveText("Моё");
  });

  test('На странице Мое кликаем "Перейти в кинотеатр"', async () => {
    await page.getByRole("link", { name: "Перейти в Кинотеатры" }).click();
    await expect(page).toHaveURL(`${baseURL}/vod`);
  });

  test("Создаем новый профиль", async () => {
    // const context = await browser.newContext({
    //   storageState: authStateFile,  // Загружаем состояние из файла
    // });
    // const page = await context.newPage();
    await page.goto(`${baseURL}/personal/profiles`);
    await page.waitForLoadState("load");

    await page.getByRole("button", { name: "Создать профиль" }).click();
    await page.getByRole("textbox", { name: "Название" }).click();
    await page.getByRole("textbox", { name: "Название" }).fill("pro");
    await page.locator(".clickable-overlay").click();
    await page.locator("a").filter({ hasText: "Обычный" }).click();
    await page.getByRole("button", { name: "Сохранить" }).click();
    // await page.waitForTimeout(2000); // Ждем 2 секунды

    if (await page.getByRole("textbox", { name: "Пароль" }).isVisible()) {
      await page.getByRole("textbox", { name: "Пароль" }).click();
      await page.getByRole("textbox", { name: "Пароль" }).fill(password);
    }

    await page.getByRole("button", { name: "Сохранить" }).click();

    // проверяю, что хотя бы у одного элемента с классом name название pro
    const count = await page
      .locator(".name")
      .filter({ hasText: "pro" })
      .count();
    expect(count).toBeGreaterThan(0);
      await page.waitForTimeout(4000); // Ждем 4 секунды
  });

  // test.afterAll(async () => {
  //   // Закрываем браузерный контекст после всех тестов
  //   await context.close();
  // });
});
