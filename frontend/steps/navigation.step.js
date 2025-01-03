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

