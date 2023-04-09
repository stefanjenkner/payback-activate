const LOGIN_URL = 'https://www.payback.de/login';
const COUPONS_URL = 'https://www.payback.de/coupons';

const ONE_TRUST_CONSENT_SDK_SELECTOR = '#onetrust-consent-sdk';
const ONE_TRUST_ACCEPT_BTN_HANDLER_SELECTOR = '#onetrust-accept-btn-handler';

describe('Payback Activate', () => {
    it('should verify if credentials are set in environment variables', async () => {
        expect(process.env.PAYBACK_USERNAME).toBeDefined();
        expect(process.env.PAYBACK_PASSWORD).toBeDefined();
    });

    it('should log in with valid credentials', async () => {
        await browser.url(LOGIN_URL);

        // Consent
        await expect($(ONE_TRUST_CONSENT_SDK_SELECTOR)).toBeExisting();
        await $(ONE_TRUST_ACCEPT_BTN_HANDLER_SELECTOR).click();
	await browser.pause(1000);
        

        // Log in
        const usernameInput = await $('#aliasInputSecure');
        await usernameInput.click();
        await usernameInput.isFocused();
        await usernameInput.setValue(process.env.PAYBACK_USERNAME);

        const passwordInput = await $('#passwordInput');
        await passwordInput.click();
        await passwordInput.isFocused();
        await passwordInput.setValue(process.env.PAYBACK_PASSWORD);

        const loginButton = await $('#loginSubmitButtonSecure');
    	await loginButton.click();


        // Verify
        await expect($('//a[@href="/resources/action/login/logout-action"]')).toBeExisting();
        await expect($('//a[@href="/resources/action/login/logout-action"]')).toHaveTextContaining('Logout');
    });

   it('should activate available coupons', async () => {
    await browser.url(COUPONS_URL);

    // Coupon center
    await expect($('//*[@id="coupon-center"]')).toBeExisting();
    const couponCenter = await $('//*[@id="coupon-center"]').shadow$('div.coupon-center');

    // Wait for 2 seconds before activating coupons
    await browser.pause(2000);

    // Activate coupons
    const coupons = await couponCenter.$('.coupon-center__published-column').$$('.coupon--single, .coupon--double');
    for (let i = 0; i < coupons.length; i++) {
        // Scroll the coupon into the viewport
        await coupons[i].scrollIntoView({ behavior: 'smooth', block: 'center' });

        const callToAction = await coupons[i].shadow$('div.coupon pbc-coupon-call-to-action');
        try {
            const button = await callToAction.shadow$('button.not-activated');
            await button.waitForClickable({ timeout: 5000 }); // Wait for the button to become clickable (up to 5 seconds)
            await button.click();

            // Check if the "Schließen" button is present
            const closeButton = await $('button.pbb-modal__button-left.button--primary');
            if (await closeButton.isExisting()) {
                await closeButton.click();
            }
        } catch (error) {
            // ignore
            }
        }
	
    });
});
