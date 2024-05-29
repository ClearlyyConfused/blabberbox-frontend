const { By, Builder, Browser, until } = require('selenium-webdriver');

function randomString(length) {
	let string = '';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let counter = 0;
	while (counter < length) {
		string += chars.charAt(Math.floor(Math.random() * chars.length));
		counter += 1;
	}
	return string;
}

let driver;
let driver2;

beforeAll(async () => {
	// testUser1's browser
	driver = await new Builder().forBrowser(Browser.CHROME).build();
	await driver.get('http://localhost:3000/');
	await driver.manage().window().maximize();
	// testUser2's browser
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

	const title2 = await driver2.wait(until.elementLocated(By.css('h2'))).then(async (e) => await e.getText());
	expect(title2).toBe('Welcome testUser2');
});

test('The message that testUser1 sends to a chatroom is visible to another user, testUser2, in the same chatroom', async () => {
	const message = randomString(20);
	// users enter the same chat
	await driver.wait(until.elementLocated(By.className('chat'))).then(async (e) => {
		await e.click();
	});
	await driver2.wait(until.elementLocated(By.className('chat'))).then(async (e) => {
		await e.click();
	});

	// testUser1 sends a message
	await driver.wait(until.elementLocated(By.id('message'))).then(async (e) => {
		await e.sendKeys(message);
	});
	await driver.wait(until.elementLocated(By.xpath('//button[text()="Send"]'))).then(async (e) => {
		await e.click();
	});

	// wait for message to be sent on testUser1's end
	await driver.wait(until.elementLocated(By.xpath('//p[text()="' + message + '"]')));

	// get latest message on testUser2's end
	const messages = await driver2.findElements(By.className('message-content'));
	const latestMessage = await messages[messages.length - 1]
		.findElement(By.xpath('.//p'))
		.then(async (e) => e.getText());
	expect(latestMessage).toBe(message);
});

test('The message that testUser2 sends to a chatroom is visible to another user, testUser1, in the same chatroom', async () => {
	const message = randomString(20);
	// users enter the same chat
	await driver.wait(until.elementLocated(By.className('chat'))).then(async (e) => {
		await e.click();
	});
	await driver2.wait(until.elementLocated(By.className('chat'))).then(async (e) => {
		await e.click();
	});

	// testUser2 sends a message
	await driver2.wait(until.elementLocated(By.id('message'))).then(async (e) => {
		await e.sendKeys(message);
	});
	await driver2.wait(until.elementLocated(By.xpath('//button[text()="Send"]'))).then(async (e) => {
		await e.click();
	});

	// wait for message to be sent on testUser2's end
	await driver2.wait(until.elementLocated(By.xpath('//p[text()="' + message + '"]')));

	// get latest message on testUser1's end
	const messages = await driver.findElements(By.className('message-content'));
	const latestMessage = await messages[messages.length - 1]
		.findElement(By.xpath('.//p'))
		.then(async (e) => e.getText());
	expect(latestMessage).toBe(message);
});
