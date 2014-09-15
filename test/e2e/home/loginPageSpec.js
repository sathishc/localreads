// spec.js
describe('LocalReads Login Page', function() {

    beforeEach(function(){
        browser.get('http://localhost:8100/#/app/login')
    });


    it('should load the home url after login', function() {

        element(by.model('userModel.userName')).sendKeys("user@foo.com");
        element(by.model('userModel.password')).sendKeys("pass");

        element(by.id('loginButton')).click();

        browser.sleep(1000);


        var books = element.all(by.repeater('book in homeModel.books'));

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/home');
        expect(books.count()).toEqual(2);
    });
});
