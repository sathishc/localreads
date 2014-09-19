// spec.js
describe('Settings Page', function() {

    var SettingsPage = function() {
        this.settingsSearchRadius = element(by.model('settingsModel.user.searchRadius'));
        this.settingsLatitude = element(by.model('settingsModel.user.latitude'));
        this.settingsLongitude = element(by.model('settingsModel.user.longitude'));
        this.saveButton = element(by.id('settingsSaveButton'));


        this.setLatitude = function(latitude){
            this.settingsLatitude.clear();
            this.settingsLatitude.sendKeys(latitude);
        };

        this.setLongitude = function(longitude){
            this.settingsLongitude.clear();
            this.settingsLongitude.sendKeys(longitude);
        };

        this.saveButtonClick = function(){
            this.saveButton.click();
            browser.sleep(1000);
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

    it('should save the changed latitude and longitude', function() {

        settingsPage.setLatitude(10.5);
        settingsPage.setLongitude(70.5);
        settingsPage.saveButtonClick();


        browser.refresh();
        browser.sleep(3000);


        expect(settingsPage.settingsLatitude.getAttribute('value')).toEqual('10.5');
        expect(settingsPage.settingsLongitude.getAttribute('value')).toEqual('70.5');


    });

});
