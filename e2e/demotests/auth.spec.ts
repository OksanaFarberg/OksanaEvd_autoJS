// // @ts-check
// import { test, expect } from '@playwright/test'
// import { faker } from '@faker-js/faker'

// test('Создание нового юзера', async ({ page }) => {
//   await page.goto('/register')
//   await page.getByTestId('input-username').click()
//   await page.getByTestId('input-username').fill(faker.person.fullName())
//   await page.getByTestId('input-email').click()
//   await page.getByTestId('input-email').fill(faker.internet.email())
//   await page.getByTestId('input-email').press('Tab')
//   await page.getByTestId('input-password').fill('re@l_passw0rd')
//   await page.getByTestId('btn-submit').click()

//   await expect(page).toHaveURL('/?feed=feed')
// })

// test('Успешная авторизация', async ({ page }) => {
//   await page.goto('/login')

//   await page.getByTestId('input-email').click()
//   await page.getByTestId('input-email').fill('test@mail.ru')

//   await page.getByTestId('input-password').click()
//   await page.getByTestId('input-password').fill('P@ssw0rd')
//   await page.getByTestId('btn-submit').click()
//   await page.getByText('A place to share your').click()
//   await expect(page.getByText('A place to share your')).toBeVisible()
//   await expect(page.getByRole('link', { name: 'test test' })).toBeVisible()
// })