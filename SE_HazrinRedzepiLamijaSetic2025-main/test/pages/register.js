const { By } = require('selenium-webdriver');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://walrus-app-bho8r.ondigitalocean.app/register.html'); 
    }

    async enterFirstName(name) {
        await this.driver.findElement(By.name('name')).sendKeys(name);
    }

    async enterLastName(surname) {
        await this.driver.findElement(By.name('surname')).sendKeys(surname);
    }

    async enterAge(age) {
        await this.driver.findElement(By.name('age')).sendKeys(age);
    }

    async enterEmail(email) {
        await this.driver.findElement(By.name('email')).sendKeys(email);
    }

    async enterPassword(password) {
        await this.driver.findElement(By.name('password')).sendKeys(password);
    }

    async submitForm() {
        await this.driver.findElement(By.css('button[type="submit"]')).click();
    }
}

module.exports = RegisterPage;
