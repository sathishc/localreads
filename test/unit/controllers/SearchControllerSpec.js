describe('localreads', function () {
    var scope,
        mock,
        q,rootScope,
        controller;

    beforeEach(angular.mock.module('localreads'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller,SearchResultsModel,BookService,$q) {

        rootScope = $rootScope;
        scope = $rootScope.$new();
        q = $q;


        mock = {
            '$scope': scope,
            SearchResultsModel:SearchResultsModel,
            BookService:BookService
        };

        controller = $controller('SearchCtrl', mock);
        scope.$digest();
    }));

    describe('SearchCtrl',
        function () {

            // Tests

            it('has search results zero at start', function () {
                expect(scope.searchResultsModel.searchResultCount).toBe(0);
            });

            it('has search results zero when search performed with empty string', function () {
                expect(scope.searchResultsModel.searchResultCount).toBe(0);
            });

            it('should call BookService searchBooks when controller searchBooks is called with non-empty query', function () {
                spyOn(mock.BookService, "searchBooks").andCallFake(function(){
                    var deferred = q.defer(); //assume that you already inject $q service in beforeEach and save it as a variable.
                    deferred.resolve([{title:'Da Vinci'}]);
                    return deferred.promise; //returns a fake promise
                });
                scope.$digest();
                scope.searchResultsModel.searchQuery = "Da Vinci Code";
                scope.searchBooks();


                expect(mock.BookService.searchBooks).toHaveBeenCalled();
            });

            it('has positive search results count when search performed with query string', function () {
                scope.searchResultsModel.searchQuery = "Da Vinci Code";
                spyOn(mock.BookService, "searchBooks").andCallFake(function(){
                    var deferred = q.defer(); //assume that you already inject $q service in beforeEach and save it as a variable.
                    deferred.resolve([{title:'Da Vinci Code'}]);
                    return deferred.promise; //returns a fake promise
                });

                spyOn(scope, "updateResults").andCallFake(function(response){
                    scope.searchResultsModel.searchResultCount = response.length;
                    scope.searchResultsModel.searchResults = response;
                });
                scope.searchBooks();
                scope.$digest();

                expect(scope.updateResults).toHaveBeenCalled();
                expect(scope.searchResultsModel.searchResultCount).not.toBe(0);
            });
    });

});
