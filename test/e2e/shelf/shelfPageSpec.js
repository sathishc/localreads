// spec.js
describe('Add Books Page', function() {

    var AddBooksHomepage = function() {

        this.searchBox = element(by.id('searchTextField'));
        this.searchButton = element(by.id('searchButton'));
        this.searchResults = element.all(by.repeater("book in searchResultsModel.searchResults"));

        this.setSearchBox = function(text){
            this.searchBox.clear();
            this.searchBox.sendKeys(text);
        };

        this.searchButtonClick = function(){
            this.searchButton.click();
            browser.sleep(8000);
        };

        this.get = function() {
            browser.get('http://localhost:8100/#/app/search');
            browser.sleep(5000);
        };
    };

    var addBooksHomePage;

    it('should load the add books url', function() {

        addBooksHomePage = new AddBooksHomepage();
        addBooksHomePage.get();

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/search');
    });

    it('should search and find 40 books', function() {

        addBooksHomePage.setSearchBox("Javascript");
        addBooksHomePage.searchButtonClick();

        expect(addBooksHomePage.searchResults.count()).toEqual(40);
    });



});
