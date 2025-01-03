const {
  Given,
  When,
  Then,
} = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "I have added {string} to cart",
  async function (itemName) {
    await this.page.click(`text=${itemName}`);
    await this.page.click("text=Add to cart");
  }
);

When(
  "I click on the shopping cart icon",
  async function () {
    await this.page.click(".shopping_cart_link");
  }
);

When(
  "I add {string} to cart",
  async function (itemName) {
    const addButton = await this.page.locator(
      `[data-test="add-to-cart-${itemName
        .toLowerCase()
        .replace(/ /g, "-")}"]`
    );
    await addButton.click();
  }
);

When(
  "I click the {string} button",
  async function (buttonText) {
    await this.page.click(`text=${buttonText}`);
  }
);

When(
  "I click the cart button {string}",
  async function (buttonText) {
    await this.page.click(`text=${buttonText}`);
  }
);

Then(
  "I should see an empty cart",
  async function () {
    const cartItems = await this.page.locator(
      ".cart_item"
    );
    await expect(cartItems).toHaveCount(0);
  }
);

Then(
  "I should see {string} in the cart",
  async function (itemName) {
    const cartItem = await this.page.locator(
      ".inventory_item_name",
      {
        hasText: itemName,
      }
    );
    await expect(cartItem).toBeVisible();
  }
);

Then(
  "I should see the correct price",
  async function () {
    const price = await this.page.locator(
      ".inventory_item_price"
    );
    await expect(price).toBeVisible();
  }
);

Then(
  "I should see the {string} button",
  async function (buttonText) {
    const button = await this.page.locator(
      `text=${buttonText}`
    );
    await expect(button).toBeVisible();
  }
);

Then(
  "I should see {int} items in the cart",
  async function (itemCount) {
    const cartItems = await this.page.locator(
      ".cart_item"
    );
    await expect(cartItems).toHaveCount(
      itemCount
    );
  }
);

Then(
  "I should see the correct total price",
  async function () {
    const prices = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    const total = prices.reduce(
      (sum, price) =>
        sum + parseFloat(price.replace("$", "")),
      0
    );
    await expect(total).toBeGreaterThan(0);
  }
);

Then(
  "the item should be removed from cart",
  async function () {
    const cartItems = await this.page.locator(
      ".cart_item"
    );
    await expect(cartItems).toHaveCount(0);
  }
);

Then(
  "I should return to the inventory page",
  async function () {
    await expect(this.page).toHaveURL(
      /.*inventory.html/
    );
  }
);

Then(
  "I should be taken to the checkout information page",
  async function () {
    await expect(this.page).toHaveURL(
      /.*checkout-step-one.html/
    );
  }
);
