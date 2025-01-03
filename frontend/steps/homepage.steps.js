const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the homepage", async function () {
  await this.page.goto("https://www.saucedemo.com/", {
    waitUntil: "networkidle",
  });
});

Then("I should see the page title as {string}", async function (expectedTitle) {
  const title = await this.page.title();
  await expect(title).toBe(expectedTitle);
});
