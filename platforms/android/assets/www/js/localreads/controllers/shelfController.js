'use strict';

localReadControllers.controller('ShelfCtrl', function($scope, $ionicPlatform,LocalReadsModelService,OwnershipsModel) {

    $scope.shelfModel = OwnershipsModel;

    $scope.removeBook = function($event){
        var volumeId = $event.currentTarget.id;
        LocalReadsModelService.removeBookFromShelf(volumeId);
    }

});
