const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const RegisterPage = require('./pages/register'); 

(async function runTest() {
  
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const registerPage = new RegisterPage(driver); 

  try {
    
    await registerPage.open();

    await registerPage.enterFirstName("Hazrin");
    await registerPage.enterLastName("Redzepi");
    await registerPage.enterAge("25");
    await registerPage.enterEmail(`hazrin${Date.now()}@mail.com`);
    await registerPage.enterPassword("Test12345");

    
    await registerPage.submitForm();

    
    await driver.sleep(3000); 

    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('login.html')) {
      console.log("Test passed: Redirected to login page.");
    } else {
      console.error("Test failed: Still on the register page.");
    }
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await driver.quit();
  }
})();
