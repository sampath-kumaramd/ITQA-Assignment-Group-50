const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am logged in to Swag Labs", async function () {
  await this.page.goto("https://www.saucedemo.com/");

  await this.page.locator("#user-name").fill("problem_user");
  await this.page.locator("#password").fill("secret_sauce");
  await this.page.locator("#login-button").click();

  await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await this.page.waitForTimeout(2000);
});

Given("I am on the cart page", async function () {
  await this.page.locator(".shopping_cart_link").click();
  await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
  await this.page.waitForTimeout(2000);
});

Given("I have items in my cart", async function () {
  await this.page.goto("https://www.saucedemo.com/inventory.html");

  const addToCartButton = await this.page
    .locator(".inventory_item button")
    .first();
  await addToCartButton.click();

  const cartBadge = await this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveText("1");
  await this.page.waitForTimeout(2000);
});

When("I click on the {string} button", async function (buttonText) {
  switch (buttonText) {
    case "Checkout":
      await this.page.waitForSelector('[data-test="checkout"]', {
        state: "visible",
      });
      await this.page.click('[data-test="checkout"]');
      break;
    case "Continue Shopping":
      await this.page.waitForSelector('[data-test="continue-shopping"]', {
        state: "visible",
      });
      await this.page.click('[data-test="continue-shopping"]');
      break;
    case "Continue":
      await this.page.waitForSelector('[data-test="continue"]', {
        state: "visible",
      });
      await this.page.click('[data-test="continue"]');
      break;
    case "Finish":
      await this.page.waitForSelector('[data-test="finish"]', {
        state: "visible",
      });
      await this.page.click('[data-test="finish"]');
      break;
    case "Back Home":
      await this.page.waitForSelector('[data-test="back-to-products"]', {
        state: "visible",
      });
      await this.page.click('[data-test="back-to-products"]');
      break;
    default:
      throw new Error(`Button "${buttonText}" is not supported`);
  }
});

Then(
  "I should be redirected to the checkout information page",
  async function () {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );

    await expect(this.page.locator("#first-name")).toBeVisible();
    await expect(this.page.locator("#last-name")).toBeVisible();
    await expect(this.page.locator("#postal-code")).toBeVisible();

    await this.page.waitForTimeout(2000);
  }
);

Then("I should be redirected to the products page", async function () {
  await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await this.page.waitForTimeout(2000);
});

Given("I am on the checkout information page", async function () {
  await this.page.locator(".shopping_cart_link").click();
  await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");

  await this.page.waitForSelector('[data-test="checkout"]', {
    state: "visible",
  });
  await this.page.click('[data-test="checkout"]');

  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

  await expect(this.page.locator("#first-name")).toBeVisible();
  await expect(this.page.locator("#last-name")).toBeVisible();
  await expect(this.page.locator("#postal-code")).toBeVisible();
  await this.page.waitForTimeout(2000);
});

When("I fill in the checkout information", async function (dataTable) {
  const [userInfo] = dataTable.hashes();

  await this.page.locator("#first-name").fill(userInfo.firstName);
  await this.page.locator("#last-name").fill(userInfo.lastName);
  await this.page.locator("#postal-code").fill(userInfo.postalCode);

  await this.page.waitForTimeout(2000);
});

Then("I should be redirected to the checkout overview page", async function () {
  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  await expect(this.page.locator(".summary_info")).toBeVisible();
  await expect(this.page.locator(".cart_list")).toBeVisible();
  await expect(this.page.locator('[data-test="finish"]')).toBeVisible();
  await this.page.waitForTimeout(2000);
});

Given("I have filled in the checkout information", async function (dataTable) {
  await this.page.locator(".shopping_cart_link").click();
  await this.page.click('[data-test="checkout"]');

  const [userInfo] = dataTable.hashes();
  await this.page.fill('[data-test="firstName"]', userInfo.firstName);
  await this.page.fill('[data-test="lastName"]', userInfo.lastName);
  await this.page.fill('[data-test="postalCode"]', userInfo.postalCode);

  await this.page.waitForTimeout(2000);
});

Given("I am on the overview page", async function () {
  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  await expect(this.page.locator(".summary_info")).toBeVisible();
  await expect(this.page.locator(".cart_list")).toBeVisible();
  await expect(this.page.locator('[data-test="finish"]')).toBeVisible();
  await this.page.waitForTimeout(2000);
});

Then("I should be redirected to the complete page", async function () {
  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  await expect(this.page.locator(".complete-header")).toBeVisible();
  await expect(this.page.locator(".complete-text")).toBeVisible();
  await expect(
    this.page.locator('[data-test="back-to-products"]')
  ).toBeVisible();
  await this.page.waitForTimeout(2000);
});

Given("I have clicked on the checkout button", async function () {
  await this.page.locator(".shopping_cart_link").click();
  await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");

  await this.page.waitForSelector('[data-test="checkout"]', {
    state: "visible",
  });
  await this.page.click('[data-test="checkout"]');

  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );
});

Given("I have clicked on the continue button", async function () {
  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

  try {
    await this.page.click('button[data-test="continue"]');
  } catch (error) {
    await this.page.click("#continue");
  }

  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );
  await this.page.waitForTimeout(2000);
});

Given("I have clicked on the {string} button", async function (buttonText) {
  await this.page.waitForSelector(`[data-test="finish"]`, { state: "visible" });
  await this.page.click(`[data-test="finish"]`);

  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );
});

Given("I am on the complete page", async function () {
  await expect(this.page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  await expect(this.page.locator(".complete-header")).toBeVisible();
  await expect(this.page.locator(".complete-text")).toBeVisible();
  await expect(
    this.page.locator('[data-test="back-to-products"]')
  ).toBeVisible();
});
