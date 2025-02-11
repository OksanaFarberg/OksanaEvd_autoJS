

// --
export async function TenantInfoPage({ page }) {
    const clickOwnerKebabMenu = async () => {
      await page
        .locator('(//span[@class="mat-mdc-button-touch-target"])[2]')
        .click()
    }
  
    const clickAddTenantOwner = async () => {
      await page.locator('//span[contains(@class, "label")]').click()
    }
  
    const fillSearch = async email => {
      await page.locator('//input').fill(email)
    }
  
    const clickSearch = async () => {
      await page.locator('(//mat-icon)[1]').click()
    }
  
    const Search = async () => {
      await fillSearch('toma.admin@gmail.com')
      await clickSearch()
    }
  
    return {
      clickOwnerKebabMenu,
      clickAddTenantOwner,
      fillSearch,
      clickSearch,
      Search,
    }
  }