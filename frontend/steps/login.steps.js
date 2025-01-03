const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I enter {string} as username", async function (username) {
  await this.page.fill("#user-name", username);
});

When("I enter {string} as password", async function (password) {
  await this.page.fill("#password", password);
});

When("I click the login button", async function () {
  await this.page.click("#login-button");
});

Then("I should be redirected to the inventory page", async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then(
  "I should be redirected to the inventory page within {int} seconds",
  async function (seconds) {
    await expect(this.page).toHaveURL(/.*inventory.html/, {
      timeout: seconds * 1000,
    });
  }
);
