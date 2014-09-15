'use strict';

localReadControllers.controller('LoginCtrl',
    function($scope,$state,
             UserModel,
             LocalReadsService,LocalReadsModelService) {
    $scope.userModel = UserModel;


    $scope.register = function(){
            LocalReadsService.signup($scope.userModel.userName,$scope.userModel.password)
            .then(function(response){
                $scope.userModel.message = response.message;
            });
    };

    $scope.login = function(){
            LocalReadsService.login($scope.userModel.userName,$scope.userModel.password)
            .then(function(response){
                $scope.userModel.message = response.message;
                $scope.userModel.token = response.access_token;
                // populate data
                LocalReadsModelService.getOwnedBooks();
                LocalReadsModelService.getLatestBooks();
                    console.log("Retrieved Latest and Owned Books");
                    // navigate to home
                $state.go("app.home");
            });
    };
});
