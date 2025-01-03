const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am logged in to the website", async function () {
  await this.page.goto("https://www.saucedemo.com/");
  await this.page.locator('[data-test="username"]').fill("problem_user");
  await this.page.locator('[data-test="password"]').fill("secret_sauce");
  await this.page.locator('[data-test="login-button"]').click();
});

Given("I navigate to the products page", async function () {
  await expect(this.page.locator(".title")).toHaveText("Products");
});

Then(
  "each product in the cart should display a different image",
  async function () {
    const productImages = await this.page
      .locator(".inventory_item_img img")
      .evaluateAll((images) => images.map((img) => img.src));

    const uniqueImages = new Set(productImages);
    expect(uniqueImages.size).toBe(productImages.length);
  }
);
