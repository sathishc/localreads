// spec.js
describe('LocalReads Add Books Page', function() {

    beforeEach(function(){
        browser.get('http://localhost:8100/#/app/search');
    });


    it('should load the add books url', function() {

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/search');
    });

    it('should search and find 40 books', function() {

        browser.sleep(1000);

        var searchBox = element(by.id('searchTextField'));
        var searchButton = element(by.id('searchButton'));

        searchBox.sendKeys("Javascript");
        searchButton.click();

        browser.sleep(2000);

        var results = element.all(by.repeater("book in searchResultsModel.searchResults"));
        expect(results.count()).toEqual(40);

    });



});
