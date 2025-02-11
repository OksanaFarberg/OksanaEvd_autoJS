import type { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export function AuthPage({page}) {
    const authStateFile = "./e2e/20_hw_tests/auth.json";

    // Добавляю состояние браузера и страницы, чтобы не открывать на каждый тест заново
    
    let context;
    let page;
    
    const prewContext = async () => {
    // Создаем один контекст на все тесты
    context = await browser.newContext();
    page = await context.newPage();

    // Авторизация перед всеми тестами
    await page.goto(`${baseURL}/login`);
    await page.waitForLoadState("load");
    }
const visit = async () => {
    await page.goto(`${baseURL}/login`);
}

const fillUsername = async (username) => {
    await page.getByText("По логину").click();
    await page.getByRole("textbox", { name: "Логин" }).fill(login);
    }
    
    const fillPassword = async (password) => {
        await page.getByRole("textbox", { name: "Пароль" }).fill(password);
        await page.getByRole("button", { name: "Далее" }).click();
        // Сохраняем авторизованное состояние
            await context.storageState({ path: authStateFile });
    
         
    }
       
       const nextWindow = async () => {
        await page.waitForLoadState("load");
        await page.getByRole("button", { name: "Далее" }).click();
        await page.getByRole("button", { name: "Перейти к просмотру" }).click();
        await page.waitForLoadState("load");
       }

       return {
        prewContext,
        visit,
        fillUsername,
        fillPassword,
        nextWindow
       }     
    
         
}