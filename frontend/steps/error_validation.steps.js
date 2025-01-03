const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I proceed to checkout", async function () {
  await this.page.click(".shopping_cart_link");
  await this.page.click('[data-test="checkout"]');
});

When("I click Continue without filling any information", async function () {
  await this.page.click('[data-test="continue"]');
});

When("I fill in only the first name", async function () {
  await this.page.fill('[data-test="firstName"]', "John");
  await this.page.click('[data-test="continue"]');
});

When("I fill in first and last name", async function () {
  await this.page.fill('[data-test="firstName"]', "John");
  await this.page.fill('[data-test="lastName"]', "Doe");
  await this.page.click('[data-test="continue"]');
});

When("I click Continue", async function () {
  await this.page.click('[data-test="continue"]');
});

When(
  "I enter a string of {int} characters in the first name field",
  async function (length) {
    const longString = "A".repeat(length);
    await this.page.fill('[data-test="firstName"]', longString);
    await this.page.waitForTimeout(500);
  }
);

When(
  "I enter special characters {string} in the first name field",
  async function (chars) {
    await this.page.fill('[data-test="firstName"]', chars);
  }
);

When("I enter {string} in the email field", async function (email) {
  await this.page.fill('[data-test="email"]', email);
});

When("I enter {string} in the postal code field", async function (postalCode) {
  await this.page.fill('[data-test="postalCode"]', postalCode);
  await this.page.waitForTimeout(500);
});

When("I fill in first name {string}", async function (firstName) {
  await this.page.fill('[data-test="firstName"]', firstName);
});

When("I fill in last name {string}", async function (lastName) {
  await this.page.fill('[data-test="lastName"]', lastName);
});

Then(
  "the field should only accept the first {int} characters",
  async function (maxLength) {
    const fieldValue = await this.page.inputValue('[data-test="firstName"]');
    expect(
      fieldValue.length,
      `Input field contains ${fieldValue.length} characters, expected maximum ${maxLength}`
    ).toBeLessThanOrEqual(maxLength);
  }
);

Then("I should not see any error messages", async function () {
  const errorElement = await this.page.$(".error-message");
  expect(errorElement).toBeNull();
});

Then(
  "the first name field should contain {string}",
  async function (expectedValue) {
    const fieldValue = await this.page.inputValue('[data-test="firstName"]');
    expect(fieldValue).toBe(expectedValue);
  }
);

Then(
  "the last name field should contain {string}",
  async function (expectedValue) {
    const fieldValue = await this.page.inputValue('[data-test="lastName"]');
    expect(fieldValue).toBe(expectedValue);
  }
);
