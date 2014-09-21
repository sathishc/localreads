'use strict';

localReadControllers.controller('HomeCtrl', function($scope,$state,$ionicGesture,
                                                     LocalReadsModelService,
                                                     OwnershipsModel,HomeModel,RequestModel) {
    $scope.homeModel = HomeModel;

    $scope.updateHome = function(response){
        $scope.homeModel.books = response;
    };

    $scope.addToShelf = function($event,data){
        var volumeId = data.book.identifier;
        LocalReadsModelService.addToShelf(volumeId);
    };

    $scope.initiateRequest = function($event,data){
        RequestModel.activeUserId = data.ownerId;
        RequestModel.activeBook = data.book;

        console.log(data);
        $state.go("app.request");

    };

    $scope.isFiltering = false;
    $scope.filterBooks = function(){
        $scope.isFiltering = true;
        LocalReadsModelService.getBooksNearby()
            .then(function(){
                $scope.isFiltering = false;
            });
    };

    $scope.$watch('homeModel.searchFilter', _.debounce(function(newValue,oldValue){
        // This code will be invoked after 1 second from the last time 'id' has changed.
        $scope.$apply(function(){
            if(newValue != oldValue){
                $scope.filterBooks();
            }
        })

    },1000));


    $scope.getItemHeight = function(item, index) {
        //Make evenly indexed items be 10px taller, for the sake of example
        return (index % 2) === 0 ? 50 : 60;
    };
});


