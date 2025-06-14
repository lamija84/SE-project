const { By, until } = require('selenium-webdriver');

class WishlistPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://walrus-app-bho8r.ondigitalocean.app/index.html#wishlist';
    }

    async open() {
        await this.driver.get(this.url);
    }

    async clickAddWish() {
        const btn = await this.driver.findElement(By.id('addWishBtn'));
        await this.driver.wait(until.elementIsVisible(btn), 3000);
        await btn.click();
    }

    async clickEditWish() {
        const btn = await this.driver.findElement(By.id('editWishBtn'));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", btn);
        await this.driver.wait(until.elementIsVisible(btn), 3000);
        await btn.click();
    }

    async selectWishByName(wishName) {
        await this.driver.sleep(2000);

        const rows = await this.driver.findElements(By.css('#wishlistTable tbody tr'));
        for (let row of rows) {
            const text = await row.getText();
            if (text.includes(wishName)) {
                const radio = await row.findElement(By.css('input[type="radio"][name="wish-select"]'));
                await this.driver.executeScript("arguments[0].scrollIntoView(true);", radio);
                await this.driver.sleep(500);
                const actions = this.driver.actions({ async: true });
                await actions.move({ origin: radio }).click().perform();

                
                await this.driver.executeScript("window.scrollTo(0, 0);");
                await this.driver.sleep(500);
                return true;
            }
        }
        throw new Error(`Wish with name "${wishName}" not found.`);
    }

    async updateWishName(newName) {
        const input = await this.driver.findElement(By.id('editWishName'));
        await input.clear();
        await input.sendKeys(newName);
    }

    async submitEditForm() {
        const btn = await this.driver.findElement(By.css('#editWishModal .btn.btn-primary'));
        await btn.click();
    }

    async checkNotification() {
        const bodyText = await this.driver.findElement(By.tagName('body')).getText();
        return bodyText.includes('deleted') || bodyText.includes('uspješno');
    }
    
        async clickDeleteWish() {
        const btn = await this.driver.findElement(By.id('deleteWishBtn'));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", btn);
        await this.driver.wait(until.elementIsVisible(btn), 3000);
        await btn.click();
    }

    async confirmDelete() {
        const confirmBtn = await this.driver.findElement(By.id('confirmDeleteWish'));
        await this.driver.wait(until.elementIsVisible(confirmBtn), 3000);
        await confirmBtn.click();
    }

}

module.exports = WishlistPage;
