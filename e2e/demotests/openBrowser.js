// Для запуска npx babel-node и адрес файла в консоли

import playwright from 'playwright';

(async () => {
  for (const browserType of ['chromium']) {
    const browser = await playwright[browserType].launch({
      // отображать или нет браузер
      headless: false,
      slowMo: 500
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://yandex.ru/')
    await page.screenshot({ path: `screenshots/ewxp-${browserType}${Date.now()}.png` });

    await browser.close();
  }
})();