const { When } = require("@cucumber/cucumber");
const { request } = require("playwright");
const { createAuthHeaders } = require("./auth_steps");

When("I send a DELETE request to {string}", async function (endpoint) {
  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: createAuthHeaders(this.role),
  });
  const response = await apiRequestContext.delete(
    `http://localhost:7081${endpoint}`
  );
  this.response = response;
  await apiRequestContext.dispose();
});

When(
  "I send a DELETE request to {string} without authentication",
  async function (endpoint) {
    const apiRequestContext = await request.newContext();
    const response = await apiRequestContext.delete(
      `http://localhost:7081${endpoint}`
    );
    this.response = response;
    await apiRequestContext.dispose();
  }
);
