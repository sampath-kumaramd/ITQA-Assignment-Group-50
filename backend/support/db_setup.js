const { Before } = require("@cucumber/cucumber");
const { request } = require("playwright");

const seedData = [
  {
    id: 1,
    title: "Test Book 90",
    author: "Author 90",
  },
  {
    id: 2,
    title: "Test Book 91",
    author: "Author 91",
  },
  {
    id: 3,
    title: "Test Book 92",
    author: "Author 3",
  },
];

Before(async function () {
  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Basic ${Buffer.from("admin:password").toString(
        "base64"
      )}`,
    },
  });

  for (const book of seedData) {
    try {
      await apiRequestContext.post("http://localhost:7081/api/books", {
        data: book,
      });
    } catch (error) {
      console.log("Warning: Could not seed book ${book.id}");
    }
  }

  await apiRequestContext.dispose();
});
