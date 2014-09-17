// spec.js
describe('Settings Page', function() {

    var SettingsPage = function() {

        this.settingsSearchRadius = element(by.binding('userModel.searchRadius'));
        this.settingsLatitude = element(by.model('userModel.latitude'));
        this.settingsLongitude = element(by.model('userModel.longitude'));
        this.saveButton = element(by.id('settingsSaveButton'));


        this.setSearchRadius = function(text){
            this.settingsSearchRadius.clear();
            this.settingsSearchRadius.sendKeys(text);
        };

        this.setLatitude = function(text){
            this.settingsLatitude.clear();
            this.settingsLatitude.sendKeys(text);
        };

        this.setLongitude = function(text){
            this.settingsLongitude.clear();
            this.settingsLongitude.sendKeys(text);
        };

        this.saveButtonClick = function(){
            this.saveButton.click();
            browser.sleep(8000);
        };

        this.get = function() {
            browser.get('http://localhost:8100/#/app/settings');
            browser.sleep(5000);
        };
    };

    var settingsPage;


    it('should load the settings page url', function() {
        settingsPage = new SettingsPage();
        settingsPage.get();

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/settings');
    });

    it('should save the changed search radius', function() {
        this.settingsSearchRadius(10);
        this.saveButtonClick();

        browser.refresh();
        browser.sleep(1000);

        expect(this.settingsSearchRadius).toBe(10);

        this.settingsSearchRadius(5);
        this.saveButtonClick();

        browser.refresh();
        browser.sleep(1000);

        expect(this.settingsSearchRadius).toBe(5);
    });

});
