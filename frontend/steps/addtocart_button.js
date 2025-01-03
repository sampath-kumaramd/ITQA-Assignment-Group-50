const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I click the add to cart button in product card", async function () {
  await this.page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
});

Then("Some add to cart buttons are not working", async function () {
  await this.page.locator('[data-test="shopping-cart-link"]').click();
  await expect(this.page.locator(".cart_item")).toBeVisible();
});
