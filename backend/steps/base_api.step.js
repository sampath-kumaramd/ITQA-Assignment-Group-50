const { Given, When, Then } = require("@cucumber/cucumber");
const { request } = require("playwright");

Given("the server is running", async function () {
  // Precondition: Assume the server is running.
});

When(
  "I send a request to the base API without authentication",
  async function () {
    const apiRequestContext = await request.newContext();
    const response = await apiRequestContext.get(`http://localhost:7081`);
    this.response = response;
    await apiRequestContext.dispose();
  }
);

Then("the response status should be {int}", async function (statusCode) {
  if (this.response.status() !== statusCode) {
    throw new Error(
      `Expected status ${statusCode} but got ${this.response.status()}`
    );
  }
});
