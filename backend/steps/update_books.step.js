const { When } = require("@cucumber/cucumber");
const { request } = require("playwright");
const { createAuthHeaders } = require("./auth_steps");

When("I update the book with following details:", async function (dataTable) {
  const bookData = dataTable.hashes()[0];
  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: createAuthHeaders(this.role),
  });
  const response = await apiRequestContext.put(
    `http://localhost:7081/api/books/${this.bookId}`,
    {
      data: bookData,
    }
  );
  this.response = response;
  await apiRequestContext.dispose();
});
