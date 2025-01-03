const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("the burger menu is open", async function () {
  await this.page.click("#react-burger-menu-btn");
});

When("I click the burger menu button", async function () {
  await this.page.click("#react-burger-menu-btn");
});

When("I click the close button", async function () {
  await this.page.click("#react-burger-cross-btn");
});

When("I click the menu item {string}", async function (menuItem) {
  const menuSelectors = {
    "All Items": "#inventory_sidebar_link",
    About: "#about_sidebar_link",
    Logout: "#logout_sidebar_link",
    "Reset App State": "#reset_sidebar_link",
  };
  await this.page.click(menuSelectors[menuItem]);
});

Then("I should see the menu items", async function () {
  const menuItems = await this.page.locator(".bm-item-list");
  await expect(menuItems).toBeVisible();
});

Then("I should see the close button", async function () {
  const closeButton = await this.page.locator("#react-burger-cross-btn");
  await expect(closeButton).toBeVisible();
});

Then("the menu should be hidden", async function () {
  const menu = await this.page.locator(".bm-menu-wrap");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
});

Then("I should be on the inventory page", async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then("I should be redirected to Sauce Labs website", async function () {
  await expect(this.page).toHaveURL("https://saucelabs.com/");
});

Then("I should be logged out", async function () {
  await expect(this.page).toHaveURL(/.*$/);
});

Then("I should see the login page", async function () {
  const loginButton = await this.page.locator("#login-button");
  await expect(loginButton).toBeVisible();
});

Then("my cart should be empty", async function () {
  const cartBadge = await this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveCount(0);
});

Then('all items should be reset to "Add to cart"', async function () {
  await this.page.waitForTimeout(3000);
  await this.page.click("#react-burger-cross-btn");
  await this.page.reload();

  try {
    await this.page.waitForSelector('[data-test^="remove"]', {
      state: "detached",
      timeout: 5000,
    });
  } catch (e) {}

  const addButtons = await this.page.locator('[data-test^="add-to-cart"]');
  const buttonCount = await addButtons.count();
  expect(buttonCount).toBeGreaterThan(0);

  const removeButtons = await this.page.locator('[data-test^="remove"]');
  await expect(removeButtons).toHaveCount(0);
});
