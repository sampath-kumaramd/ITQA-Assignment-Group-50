const { When } = require("@cucumber/cucumber");
const { request } = require("playwright");
const { createAuthHeaders } = require("./auth_steps");

When("I create a new book with following details:", async function (dataTable) {
  const bookData = dataTable.hashes()[0];
  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: createAuthHeaders(this.role),
  });
  const response = await apiRequestContext.post(
    `http://localhost:7081/api/books`,
    {
      data: bookData,
    }
  );
  this.response = response;

  try {
    this.responseBody = await this.response.json();
  } catch {}

  await apiRequestContext.dispose();
});
