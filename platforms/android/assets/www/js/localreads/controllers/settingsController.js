'use strict';

localReadControllers.controller('SettingsCtrl',
    function($scope,$ionicModal, UserModel, SettingsModel, LocalReadsModelService) {

    $scope.userModel = UserModel;
    $scope.settingsModel = SettingsModel;

    $scope.settingsDirty = false;


    $scope.save = function(){
        LocalReadsModelService.updateUserInfo();
        $scope.settingsDirty = false;
    };

    $scope.$watch('settingsModel.user.searchRadius', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));

    $scope.$watch('settingsModel.user.latitude', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));

    $scope.$watch('settingsModel.user.longitude', _.debounce(function(newValue,oldValue){
        $scope.settingsDirty = true;
    },2000));

        $scope.$watch('settingsModel.details', _.debounce(function(newValue,oldValue){
            console.log(newValue);
        },2000));


    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/settings-place.html', function(modal) {
        $scope.settingsPlaceModal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.openPlace = function() {
        $scope.settingsPlaceModal.show();
    };

    $scope.closePlace = function() {
        $scope.settingsPlaceModal.hide();
    };

});
