var localReadControllers = angular.module('localreads.controllers', [])

localReadControllers.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

});

localReadControllers.controller('HomeCtrl', function($scope) {
        $scope.name = "Superhero";
        $scope.counter = 0;
});

localReadControllers.controller('SearchCtrl', function($scope,SearchResultsModel,BookService) {

        $scope.searchResultsModel = SearchResultsModel;

        $scope.searchBooks = function(){

            if($scope.searchResultsModel.searchQuery == '' ||
                $scope.searchResultsModel.searchQuery == undefined ||
                $scope.searchResultsModel.searchQuery == null){
                return;
            }

            //search query is non-empty
            // use a service to load books from Google books
            var responseData = BookService.searchBooks($scope.searchResultsModel.searchQuery)
            .then(function(response){
                $scope.updateResults(response);
            },(function(error){
                console.log("Error in getting books")
            }));
        };

        $scope.updateResults = function(response){
            $scope.searchResultsModel.searchResultCount = response.length;
            $scope.searchResultsModel.searchResults = response;
        }

});

