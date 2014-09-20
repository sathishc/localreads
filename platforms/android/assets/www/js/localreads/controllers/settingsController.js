'use strict';

localReadControllers.controller('SettingsCtrl', function($scope, UserModel, LocalReadsModelService) {

    $scope.settingsModel = UserModel;


    $scope.save = function(){
        LocalReadsModelService.updateUserInfo();
    };
});
