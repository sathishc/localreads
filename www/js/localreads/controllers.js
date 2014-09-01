var localReadControllers = angular.module('localreads.controllers', [])

localReadControllers.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

});

localReadControllers.controller('HomeCtrl', function($scope) {
        $scope.name = "Superhero";
        $scope.counter = 0;
});

localReadControllers.controller('SearchCtrl', function($scope,SearchResultsModel) {
        $scope.results = SearchResultsModel.searchResults;
        $scope.counter = SearchResultsModel.searchResultCount;
});

