const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./pages/login');
const WishlistPage = require('./pages/wishlist');

(async function runAddWishTest() {
  const options = new chrome.Options();
  //options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const loginPage = new LoginPage(driver);
  const wishlistPage = new WishlistPage(driver);

  try {
    
    await loginPage.open();
    await loginPage.enterEmail('ring@gmail.com');
    await loginPage.enterPassword('Ring123');
    await loginPage.submitForm();
    await driver.sleep(3000);

    
    await wishlistPage.open();
    await driver.sleep(1000);

    await wishlistPage.clickAddWish();
    await wishlistPage.fillAddWishForm("Test Wish", "This is a Selenium test.");
    await wishlistPage.submitAddWishForm();

    
    const isWishAdded = await wishlistPage.isWishInTable("Test Wish");
    if (isWishAdded) {
      console.log("Wish added successfully and visible in table.");
    } else {
      console.error("Wish not found in the wishlist table.");
    }

  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await driver.quit();
  }
})();
