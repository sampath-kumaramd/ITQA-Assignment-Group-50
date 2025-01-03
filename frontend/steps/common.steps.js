const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I have items in cart", async function () {
  await this.page.click(`[data-test="add-to-cart-sauce-labs-backpack"]`);
});

When("I click {string}", async function (buttonText) {
  const buttonSelectors = {
    About: "#about_sidebar_link",
    Logout: "#logout_sidebar_link",
    "Reset App State": "#reset_sidebar_link",
    Checkout: "[data-test='checkout']",
    Cancel: "[data-test='cancel']",
    Finish: "[data-test='finish']",
  };
  await this.page.click(buttonSelectors[buttonText] || `text=${buttonText}`);
});

Then("I should see error message {string}", async function (errorMessage) {
  const error = await this.page.locator('[data-test="error"]');
  await expect(error).toHaveText(errorMessage);
});
