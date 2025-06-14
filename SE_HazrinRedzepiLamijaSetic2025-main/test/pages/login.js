const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://walrus-app-bho8r.ondigitalocean.app/login.html';
    }

    async open() {
        await this.driver.get(this.url);
    }

    async enterEmail(email) {
        await this.driver.findElement(By.id('email')).sendKeys(email);
    }

    async enterPassword(password) {
        await this.driver.findElement(By.id('password')).sendKeys(password);
    }

    async submitForm() {
        await this.driver.findElement(By.css('button[type="submit"]')).click();
    }
}

module.exports = LoginPage;
