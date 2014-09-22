'use strict';

localReadControllers.controller('SearchCtrl', function($scope,
                                                       SearchResultsModel,
                                                       LocalReadsModelService,
                                                       googleBookService) {

        $scope.searchResultsModel = SearchResultsModel;


        $scope.addToShelf = function(book){
            LocalReadsModelService.addToShelf(book.id);
        };

        $scope.$watch('searchResultsModel.searchQuery', _.debounce(function(newValue,oldValue){
            if(newValue != oldValue){
                $scope.searchBooks();
            }
        },500));

        $scope.isSearching = false;
        $scope.searchBooks = function(){

            if($scope.searchResultsModel.searchQuery == '' ||
                $scope.searchResultsModel.searchQuery == undefined ||
                $scope.searchResultsModel.searchQuery == null){
                return;
            }


            $scope.isSearching = true;
            //search query is non-empty
            // use a service to load books from Google books
            var responseData = googleBookService.searchBooks($scope.searchResultsModel.searchQuery)
            .then(function(response){
                    $scope.isSearching = false;
                    $scope.updateResults(response);
            },(function(error){
                    $scope.isSearching = false;
                    console.log("Error in getting books")
            }));
        };

        $scope.updateResults = function(response){
            $scope.searchResultsModel.searchResultCount = response.length;
            $scope.searchResultsModel.searchResults = response.items;
        }

});

