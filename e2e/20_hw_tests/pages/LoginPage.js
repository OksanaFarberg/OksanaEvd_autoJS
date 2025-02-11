import { expect } from '@playwright/test';

export function AuthPage(page) {
    const visit = async () => {
        await page.goto("https://smotreshka.tv/login");
    };

    const fillUsername = async (username) => {
        await page.getByText("По логину").click();
        await page.getByRole("textbox", { name: "Логин" }).fill(username);
    };

    const fillPassword = async (password) => {
        await page.getByRole("textbox", { name: "Пароль" }).fill(password);
        await page.getByRole("button", { name: "Далее" }).click();
    };

    return {
        visit,
        fillUsername,
        fillPassword
    };
}
