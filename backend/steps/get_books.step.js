const { Given, When, Then } = require("@cucumber/cucumber");
const { request } = require("playwright");
const { createAuthHeaders } = require("./auth_steps");

When("I send a GET request to {string}", async function (endpoint) {
  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: createAuthHeaders(this.role),
  });
  this.response = await apiRequestContext.get(
    `http://localhost:7081${endpoint}`
  );

  if (this.response.status() === 200) {
    try {
      this.responseBody = await this.response.json();
    } catch (error) {
      throw new Error(`Failed to parse response as JSON: ${error.message}`);
    }
  } else {
    try {
      this.responseBody = await this.response.json();
      console.log(this.responseBody);
    } catch {
      this.responseBody = { error: await this.response.text() };
    }
  }

  await apiRequestContext.dispose();
});

Then("the response should contain a list of books", async function () {
  if (!Array.isArray(this.responseBody)) {
    throw new Error("Expected response to be an array of books");
  }
});

Then("the response should contain the book details", async function () {
  const responseBody = this.responseBody;
  if (!responseBody.id || !responseBody.title || !responseBody.author) {
    throw new Error("Expected response to contain book details");
  }
});
