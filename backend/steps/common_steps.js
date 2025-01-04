const { Given, Then } = require("@cucumber/cucumber");

Given("a book with ID {int} exists", async function (bookId) {
  this.bookId = bookId;
});

Given("updating a book with ID {int}", async function (bookId) {
  this.bookId = bookId;
});
