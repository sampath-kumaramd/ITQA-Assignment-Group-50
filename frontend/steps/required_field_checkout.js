const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("Click the add to cart button", async function () {
  await this.page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();
});

Given(
  "I click the checkout button and direct to the checkout page",
  async function () {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.locator('[data-test="checkout"]').click();
    await expect(this.page.locator(".title")).toHaveText(
      "Checkout: Your Information"
    );
  }
);

Then("I click the Continue button and see an error message", async function () {
  await this.page.locator('[data-test="continue"]').click();

  const errorMessage = await this.page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Error: First Name is required");
});
