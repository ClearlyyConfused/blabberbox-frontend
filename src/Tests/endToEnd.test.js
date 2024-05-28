const { By, Builder, Browser, until } = require('selenium-webdriver');

describe('related tests block', () => {
	let driver;
	let driver2;

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();

		driver2 = await new Builder().forBrowser(Browser.CHROME).build();
		await driver2.get('http://localhost:3000/');
		await driver2.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
		await driver2.quit();
	});

	test('Able to log into both test accounts', async () => {
		// log in on both accounts
		await driver.wait(until.elementLocated(By.id('username'))).then(async (e) => {
			await e.sendKeys('testUser1');
		});
		await driver.wait(until.elementLocated(By.id('password'))).then(async (e) => {
			await e.sendKeys('testUser1Password');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="SUBMIT"]'))).then(async (e) => {
			await e.click();
		});

		await driver2.wait(until.elementLocated(By.id('username'))).then(async (e) => {
			await e.sendKeys('testUser2');
		});
		await driver2.wait(until.elementLocated(By.id('password'))).then(async (e) => {
			await e.sendKeys('testUser2Password');
		});
		await driver2.wait(until.elementLocated(By.xpath('//button[text()="SUBMIT"]'))).then(async (e) => {
			await e.click();
		});

		const title = await driver.wait(until.elementLocated(By.css('h2'))).then(async (e) => await e.getText());
		expect(title).toBe('Welcome testUser1');

		const title2 = await driver2
			.wait(until.elementLocated(By.css('h2')))
			.then(async (e) => await e.getText());
		expect(title2).toBe('Welcome testUser2');
	});
});
