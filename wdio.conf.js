export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
              ].concat((function() {
                return process.env.HEADLESS_CHROME === '1' ? [
                  '--headless',
                  '--window-size=1280,800',
                  '--no-sandbox',
                  '--disable-gpu',
                  '--allowed-ips=',
                  '--disable-setuid-sandbox',
                  '--disable-dev-shm-usage'] : [];
              })()),
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
    ],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: 300000,
        expectationResultHandler: function (passed, assertion) {
        }
    },
}
