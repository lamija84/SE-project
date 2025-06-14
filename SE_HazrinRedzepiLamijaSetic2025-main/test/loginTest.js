const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./pages/login'); 

(async function runLoginTest() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const loginPage = new LoginPage(driver);

  try {
    await loginPage.open();
    await loginPage.enterEmail('ring@gmail.com'); 
    await loginPage.enterPassword('Ring123');    
    await loginPage.submitForm();

    await driver.sleep(3000); 

   const currentUrl = await driver.getCurrentUrl();
    if (currentUrl === 'https://walrus-app-bho8r.ondigitalocean.app/index.html#home') {
      console.log("Login successful: Redirected to home page.");
    } else {
      console.error("Login failed: Current URL is:", currentUrl);
    }
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await driver.quit();
  }
})();
