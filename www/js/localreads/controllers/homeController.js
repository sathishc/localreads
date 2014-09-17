'use strict';

localReadControllers.controller('HomeCtrl', function($scope,$ionicPlatform,$ionicGesture,
                                                     LocalReadsModelService,
                                                     OwnershipsModel,HomeModel) {

    $scope.shelfModel = OwnershipsModel;
    $scope.homeModel = HomeModel;



    $scope.updateHome = function(response){
        $scope.homeModel.books = response;
    };


    $scope.addToShelf = function($event){
        var volumeId = $event.currentTarget.id;
        LocalReadsModelService.addToShelf(volumeId);
    };

    $scope.filterBooks = function(){
        LocalReadsModelService.getLatestBooks();
    };


    $scope.getItemHeight = function(item, index) {
        //Make evenly indexed items be 10px taller, for the sake of example
        return (index % 2) === 0 ? 50 : 60;
    };
});


