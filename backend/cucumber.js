module.exports = {
  default: {
    require: ["steps/*.js", "support/*.js"],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    },
  },
};
