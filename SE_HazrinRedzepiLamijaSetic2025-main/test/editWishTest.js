const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./pages/login');
const WishlistPage = require('./pages/wishlist');

(async function runEditWishTest() {
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
        await driver.sleep(2000);

        const targetWishName = 'Test Wish';
        await wishlistPage.selectWishByName(targetWishName);

        
        await wishlistPage.clickEditWish();
        await driver.sleep(1000);

        
        const newWishName = 'Test Wish Updated';
        await wishlistPage.updateWishName(newWishName);

        
        await wishlistPage.submitEditForm();
        await driver.sleep(2000);

        
        const success = await wishlistPage.checkNotification();

        if (success) {
            console.log('Edit wish successful – Notification detected.');
        } else {
            console.error('Edit wish failed – Notification NOT detected.');
        }

    } catch (err) {
        console.error('Test error:', err);
    } finally {
        await driver.quit();
    }
})();
