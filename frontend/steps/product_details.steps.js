const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am viewing product {string}", async function (productName) {
  await this.page.click(`text=${productName}`);
  await expect(this.page).toHaveURL(/.*inventory-item.html/);
});

Given("I am viewing product details", async function () {
  await this.page.click(".inventory_item_name");
  await expect(this.page).toHaveURL(/.*inventory-item.html/);
});

Given("I have added it to cart", async function () {
  await this.page.click("text=Add to cart");
});

When("I click on product {string}", async function (productName) {
  await this.page.click(`text=${productName}`);
});

When("I view each product's details", async function () {
  const productCount = await this.page.$$eval(
    ".inventory_item_name",
    (items) => items.length
  );

  for (let i = 0; i < productCount; i++) {
    const products = await this.page.$$(".inventory_item_name");
    await products[i].click();

    await this.page.waitForSelector(".inventory_details_img", {
      state: "visible",
    });

    await this.page.click("text=Back to products");
  }
});

Then("I should see the product image", async function () {
  const image = await this.page.locator(".inventory_details_img");
  await expect(image).toBeVisible();
});

Then("I should see the product title", async function () {
  const title = await this.page.locator(".inventory_details_name");
  await expect(title).toBeVisible();
});

Then("I should see the product description", async function () {
  const description = await this.page.locator(".inventory_details_desc");
  await expect(description).toBeVisible();
});

Then("I should see the product price", async function () {
  const price = await this.page.locator(".inventory_details_price");
  await expect(price).toBeVisible();
});
