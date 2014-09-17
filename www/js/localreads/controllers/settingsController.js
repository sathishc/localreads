'use strict';

localReadControllers.controller('SettingsCtrl', function($scope, UserModel, LocalReadsModelService) {

    $scope.userModel = UserModel;


    $scope.save = function(){
        LocalReadsModelService.updateUserInfo();
    };
});
