const { Given, Then, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, context, page;

Given("I navigate to the homepage", async function () {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.saucedemo.com/", { waitUntil: "networkidle" });
});

Then("I should see the page title as {string}", async function (expectedTitle) {
  const actualTitle = await page.title();
  if (actualTitle !== expectedTitle) {
    throw new Error(
      `Expected title: "${expectedTitle}" but got "${actualTitle}"`
    );
  }
});

After(async function () {
  await browser.close();
});
