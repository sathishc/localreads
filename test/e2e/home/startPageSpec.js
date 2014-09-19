// spec.js
describe('Start Page', function() {

    beforeEach(function(){
        browser.get("http://localhost:8100/");
        browser.executeScript("window.localStorage.clear();");
        browser.refresh();
        browser.sleep(3000);
    });

    it('should first load the login url', function() {

        browser.debugger();

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/login');
    });

});
