const { setWorldConstructor } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

class CustomWorld {
  async init() {
    this.browser = await chromium.launch({
      headless: true,
      slowMo: 10,
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.page.setDefaultTimeout(45000);
    this.page.setDefaultNavigationTimeout(45000);
  }

  async cleanup() {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
