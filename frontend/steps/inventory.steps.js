const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am on the inventory page", async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});


Then("I should see the shopping cart icon", async function () {
  const cartIcon = await this.page.locator(".shopping_cart_link");
  await expect(cartIcon).toBeVisible();
});

Then("I should see the burger menu", async function () {
  const burgerMenu = await this.page.locator("#react-burger-menu-btn");
  await expect(burgerMenu).toBeVisible();
});

Then("I should see the product sort container", async function () {
  const sortContainer = await this.page.locator(".product_sort_container");
  await expect(sortContainer).toBeVisible();
});

Then("I should see product items", async function () {
  const productItems = await this.page.locator(".inventory_item");
  const count = await productItems.count();
  expect(count).toBeGreaterThan(0);
});

When("I click {string} for {string}", async function (action, itemName) {
  const itemId = itemName.toLowerCase().replace(/ /g, "-");

  if (action === "Remove") {
    const buttonSelector = `[data-test*="${itemId}"]`;

    await this.page.waitForSelector(buttonSelector, {
      state: "visible",
      timeout: 10000,
    });
    await this.page.click(buttonSelector);

    await this.page.waitForTimeout(500);
  } else {
    const buttonId = action.toLowerCase().replace(/ /g, "-");
    await this.page.click(`[data-test="${buttonId}-${itemId}"]`);
  }
});

When("I click on the sort dropdown", async function () {
  await this.page.click(".product_sort_container");
});

When("I select {string}", async function (option) {
  await this.page.selectOption(".product_sort_container", option);
});

Then("products should be sorted alphabetically ascending", async function () {
  const productNames = await this.page.$$eval(
    ".inventory_item_name",
    (elements) => elements.map((el) => el.textContent)
  );
  const sortedNames = [...productNames].sort();
  expect(productNames).toEqual(sortedNames);
});

Then("products should be sorted alphabetically descending", async function () {
  const productNames = await this.page.$$eval(
    ".inventory_item_name",
    (elements) => elements.map((el) => el.textContent)
  );
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

Then("products should be sorted by price ascending", async function () {
  const prices = await this.page.$$eval(".inventory_item_price", (elements) =>
    elements.map((el) => parseFloat(el.textContent.replace("$", "")))
  );
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});

Then("products should be sorted by price descending", async function () {
  const prices = await this.page.$$eval(".inventory_item_price", (elements) =>
    elements.map((el) => parseFloat(el.textContent.replace("$", "")))
  );
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
});

Then("the cart badge should show {string}", async function (count) {
  const badge = await this.page.locator(".shopping_cart_badge");
  await expect(badge).toHaveText(count);
});

Then("the button should change to {string}", async function (buttonText) {
  const button = await this.page.locator(`text=${buttonText}`);
  await expect(button).toBeVisible();
});

Then("the cart badge should be empty", async function () {
  try {
    await this.page.waitForTimeout(1000);
    const badge = await this.page.locator(".shopping_cart_badge");
    await expect(badge).toHaveCount(0, { timeout: 5000 });
  } catch (error) {
    const badge = await this.page.locator(".shopping_cart_badge");
    await expect(badge).toHaveText("0", { timeout: 5000 });
  }
});

When("I click on a product name", async function () {
  await this.page.click(".inventory_item_name");
});

Then("I should see the product details page", async function () {
  await expect(this.page).toHaveURL(/.*inventory-item.html/);
  const details = await this.page.locator(".inventory_details_desc_container");
  await expect(details).toBeVisible({ timeout: 10000 });
});
