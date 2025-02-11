import { test, expect } from "@playwright/test";
import { AuthPage } from "./pages/LoginPage.js";

const baseURL = "https://smotreshka.tv";
const login = process.env.TEST_SMOTRESHKA_LOGIN;
const password = process.env.TEST_SMOTRESHKA_PASS;
const authStateFile = "./e2e/20_hw_tests/auth.json";

test("Авторизация и сохранение сессии", async ({ page }) => {
    const auth = AuthPage(page);

    await auth.visit();
    await auth.fillUsername(login);
    await auth.fillPassword(password);
    // Сохраняю авторизацию  
    await page.context().storageState({ path: authStateFile });
    await expect(page.getByRole())
    await expect(page.getByRole("main")).toContainText("Недавние каналы");
});

// Остальные тесты используют `auth.json`
test.use({ storageState: authStateFile });

test.describe("Тесты после авторизации", () => {
    test("Проверка главной страницы после логина", async () => { 
    await expect(page).toHaveURL(baseURL);
    await page.getByRole('banner').getByRole('button').nth(1).click();
    await expect(page.getByText('saymyname')).toBeVisible();
    });
});
