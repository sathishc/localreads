'use strict';

localReadControllers.controller('ShelfCtrl', function($scope, $ionicPlatform, $ionicPopup,
                                                      LocalReadsModelService,OwnershipsModel) {

    $scope.shelfModel = OwnershipsModel;

    $scope.showConfirm = function (data) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete ' + data.book.name,
            template: 'Are you sure you want to remove ' + data.book.name  +' from shelf?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.removeBook(data);
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.removeBook = function(ownership){
        LocalReadsModelService.removeBookFromShelf(ownership.id);
    }

});
