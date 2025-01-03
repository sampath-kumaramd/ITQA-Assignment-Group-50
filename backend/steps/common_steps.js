const { Given, Then } = require("@cucumber/cucumber");

Given("a book with ID {int} exists", async function (bookId) {
  this.bookId = bookId;
});
