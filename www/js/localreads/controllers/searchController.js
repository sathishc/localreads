'use strict';

localReadControllers.controller('SearchCtrl', function($scope,
                                                       SearchResultsModel,
                                                       LocalReadsModelService,
                                                       googleBookService) {

        $scope.searchResultsModel = SearchResultsModel;

        $scope.addToShelf = function($event){
            var volumeId = $event.currentTarget.id;
            LocalReadsModelService.addToShelf(volumeId);
        };

        $scope.searchBooks = function(){

            if($scope.searchResultsModel.searchQuery == '' ||
                $scope.searchResultsModel.searchQuery == undefined ||
                $scope.searchResultsModel.searchQuery == null){
                return;
            }

            console.log("Search books " + $scope.searchResultsModel.searchQuery);

            //search query is non-empty
            // use a service to load books from Google books
            var responseData = googleBookService.searchBooks($scope.searchResultsModel.searchQuery)
            .then(function(response){
                $scope.updateResults(response);
            },(function(error){
                console.log("Error in getting books")
            }));
        };

        $scope.updateResults = function(response){
            $scope.searchResultsModel.searchResultCount = response.length;
            $scope.searchResultsModel.searchResults = response.items;
        }

});

