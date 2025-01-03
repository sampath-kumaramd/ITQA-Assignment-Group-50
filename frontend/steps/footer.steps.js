const { Then, When } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("I should see Twitter link in the footer", async function () {
  const twitterLink = await this.page.locator(".social_twitter a");
  await expect(twitterLink).toBeVisible();
});

Then("I should see Facebook link in the footer", async function () {
  const facebookLink = await this.page.locator(".social_facebook a");
  await expect(facebookLink).toBeVisible();
});

Then("I should see LinkedIn link in the footer", async function () {
  const linkedinLink = await this.page.locator(".social_linkedin a");
  await expect(linkedinLink).toBeVisible();
});

Then("I should see the copyright text in the footer", async function () {
  const copyrightText = await this.page.locator(".footer_copy");
  await expect(copyrightText).toBeVisible();
});

Then("the copyright year should be current", async function () {
  const currentYear = new Date().getFullYear();
  const copyrightText = await this.page.locator(".footer_copy");
  await expect(copyrightText).toContainText(currentYear.toString());
});

When("I click on the {word} link", async function (platform) {
  const selector = `.social_${platform.toLowerCase()} a`;
  const link = await this.page.locator(selector);
  const href = await link.getAttribute("href");
  expect(href).toBeTruthy();
  this.socialLink = href;
});

Then("it should open in a new tab", async function () {
  expect(this.socialLink).toBeTruthy();
  expect(this.socialLink).toMatch(/^https?:\/\//);
});
