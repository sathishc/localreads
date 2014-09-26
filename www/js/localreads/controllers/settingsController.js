'use strict';

localReadControllers.controller('SettingsCtrl',
    function($scope,$ionicModal, UserModel, SettingsModel, LocalReadsModelService) {

    $scope.userModel = UserModel;
    $scope.settingsModel = SettingsModel;

    $scope.settingsDirty = false;
    $scope.settingsMessage ="";


    $scope.save = function(){
        LocalReadsModelService.updateUserInfo();
        $scope.settingsDirty = false;
    };

    $scope.$watch('settingsModel.user.searchRadius', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));

    $scope.$watch('userModel.user.latitude', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));

    $scope.$watch('userModel.user.longitude', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));


    $scope.setCurrentLocation = function(){
        LocalReadsModelService.setCurrentLocation();
    };
});
