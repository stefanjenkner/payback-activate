describe('Payback Activate', () => {

    it('Should read credentials from environment variables', async () => {

        expect(process.env.PAYBACK_USERNAME).toBeDefined()
        expect(process.env.PAYBACK_PASSWORD).toBeDefined()
    });

    it('Should login with valid credentials', async () => {
        await browser.url('https://www.payback.de/login');

        // consent
        await expect($('#onetrust-consent-sdk')).toBeExisting();
        await $('#onetrust-accept-btn-handler').click();
        await browser.pause(1000);

        // login
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

        // verify
        await expect($('//a[@href="/resources/action/login/logout-action"]')).toBeExisting();
        await expect($('//a[@href="/resources/action/login/logout-action"]')).toHaveTextContaining('Logout');
    });

    it('Should activate coupons', async () => {
        await browser.url('https://www.payback.de/coupons');

        // coupon center
        await expect($('//*[@id="coupon-center"]')).toBeExisting();
        const couponCenter = await $('//*[@id="coupon-center"]').shadow$('div.coupon-center');

        // activate coupons
        for await (const coupon of couponCenter.$('.coupon-center__published-column').$$('.coupon--single, .coupon--double')) {

            const callToAction = await coupon.shadow$('div.coupon pbc-coupon-call-to-action');
            try {
                const button = await callToAction.shadow$('button.not-activated');
                await button.click();
            } catch (error) {
                // ignore
            }
        }
    });
});
