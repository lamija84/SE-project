const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./pages/login');
const WishlistPage = require('./pages/wishlist');

(async function runDeleteWishTest() {
    const options = new chrome.Options();
   // options.addArguments('--headless');
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

        
        const wishToDelete = 'laptop';
        await wishlistPage.selectWishByName(wishToDelete);

        
        await wishlistPage.clickDeleteWish();
        await driver.sleep(1000);

        
        await wishlistPage.confirmDelete();
        await driver.sleep(2000);

    
        const success = await wishlistPage.checkNotification();

        if (success) {
            console.log('Delete wish successfully – Notification detected.');
        } else {
            console.error('Delete wish failed – Notification NOT detected.');
        }

    } catch (err) {
        console.error('Test error:', err);
    } finally {
        await driver.quit();
    }
})();
