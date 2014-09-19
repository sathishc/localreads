// spec.js
describe('Login Page', function() {

    var LoginHomepage = function() {
        this.nameInput = element(by.model('userModel.userName'));
        this.passwordInput = element(by.model('userModel.password'));
        this.loginButton =  element(by.id('loginButton'));
        this.errorMessage =  element(by.binding("userModel.message"));

        this.books = element.all(by.repeater('ownership in homeModel.ownerships'));

        this.get = function() {
            browser.get('http://localhost:8100/#/app/login');
            browser.sleep(1000);
        };

        this.setUserName = function(name) {
            this.nameInput.clear();
            this.nameInput.sendKeys(name);
        };

        this.setPassword = function(password) {
            this.passwordInput.clear();
            this.passwordInput.sendKeys(password);
        };

        this.loginButtonClickAndDelay = function() {
            this.loginButton.click();
            browser.sleep(5000);
        };

        this.pageTitle = function(){
            return browser.getTitle();
        }
    };

    var loginHomePage;

    it('should show login page on load', function() {

        loginHomePage = new LoginHomepage();
        loginHomePage.get();
        expect(loginHomePage.pageTitle()).toEqual('http://localhost:8100/#/app/login');
    });


    it('should show error message trying to login without user/pass', function() {

        loginHomePage.loginButtonClickAndDelay();
        expect(loginHomePage.errorMessage.getText()).toEqual("Invalid Username. Should be a valid email id");
    });


    it('should show error message with blank Username', function() {


        loginHomePage.setUserName("");
        loginHomePage.setPassword("pass");
        loginHomePage.loginButtonClickAndDelay();

        expect(loginHomePage.errorMessage.getText()).toEqual("Invalid Username. Should be a valid email id");
    });

    it('should show error message with blank Password', function() {


        loginHomePage.setUserName("user@foo.com");
        loginHomePage.setPassword("");
        loginHomePage.loginButtonClickAndDelay();

        expect(loginHomePage.errorMessage.getText()).toEqual("Invalid password. Should have at least 6 characters");
    });

    it('should load show error message after invalid login', function() {


        loginHomePage.setUserName("user@foo.com");
        loginHomePage.setPassword("passwdInvalid");
        loginHomePage.loginButtonClickAndDelay();

        expect(loginHomePage.errorMessage.getText()).toEqual("Incorrect Username or Password");
    });

    it('should load the home url and content after valid login', function() {


        loginHomePage.setUserName("user@foo.com");
        loginHomePage.setPassword("password");
        loginHomePage.loginButtonClickAndDelay();

        browser.sleep(5000);
        expect(loginHomePage.pageTitle()).toEqual('http://localhost:8100/#/app/home');
        expect(loginHomePage.books.count()).toNotEqual(0);
    });
});
