// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['disable-extensions','enable-crash-reporter-for-testing']
        },
        'loggingPrefs': {
            'browser': 'ALL'
        }
    },
    specs: [
        'home/startPageSpec.js',
        'home/loginPageSpec.js',
        'addBooks/addBooksPageSpec.js',
        'settings/settingsPageSpec.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },
    allScriptsTimeout: 20000
};
