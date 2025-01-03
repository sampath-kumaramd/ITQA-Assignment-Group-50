const { Given } = require("@cucumber/cucumber");

Given("I am authenticated as {string}", async function (role) {
  this.role = role;
});

function createAuthHeaders(role) {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${role}:password`).toString(
      "base64"
    )}`,
  };
  return headers;
}

module.exports = { createAuthHeaders };
