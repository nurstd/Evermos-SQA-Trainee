import { test, expect } from '@playwright/test';
var randomstring = require("randomstring") 
const username = ['standard_user', 'problem_user', 'performance_glitch_user'];
const password = 'secret_sauce';
const randUsername = username[Math.floor(Math.random() * username.length)];

var falsepassword = Math.random().toString(36).substring(0,13)
if (falsepassword == 'secret_sauce'){
  falsepassword = Math.random().toString(36).substring(0,13);
} else{
  falsepassword = falsepassword;
}
$
test('Positive Case Login', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();

  await page.locator('[data-test="username"]').fill(randUsername);

  await page.locator('[data-test="password"]').click();

  await page.locator('[data-test="password"]').fill(password);

  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});

test('Negative Case Login', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();

  await page.locator('[data-test="username"]').fill(randUsername);

  await page.locator('[data-test="password"]').click();

  await page.locator('[data-test="password"]').fill(falsepassword);

  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com');

});


const button = ['add-to-cart-sauce-labs-backpack',
                'add-to-cart-sauce-labs-back-light',
                'add-to-cart-sauce-labs-bolt-t-shirt',
                'add-to-cart-sauce-labs-fleece-jacket',
                'add-to-cart-sauce-labs-onesie',
                'add-to-cart-test.allthethings()-t-shirt-(red)'];
const randButton = button[Math.floor(Math.random() * button.length)];
const randZip = (Math.floor(Math.random() * 5)).toString()
const randFN = Math.random().toString(36).substring(0,9)
const randLN = randomstring.generate(10)

test('Order Product with Random Test Data', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();

  await page.locator('[data-test="username"]').fill('standard_user');

  await page.locator('[data-test="password"]').click();

  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.locator(`[data-test=${randButton}]`).click();

  await page.locator('a:has-text("1")').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

  await page.locator('[data-test="firstName"]').click();

  await page.locator('[data-test="firstName"]').fill(randFN);

  await page.locator('[data-test="lastName"]').click();

  await page.locator('[data-test="lastName"]').fill(randLN);

  await page.locator('[data-test="postalCode"]').click();

  await page.locator('[data-test="postalCode"]').fill(randZip);

  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});