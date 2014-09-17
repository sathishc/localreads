'use strict';

localReadControllers.controller('LoginCtrl',
    function($scope,$state,
             UserModel,
             LocalReadsService,LocalReadsModelService) {
    $scope.userModel = UserModel;



    $scope.register = function(){
        if(UserModel.userName == undefined || UserModel.userName == ""){
            UserModel.message = "Invalid Username. Should be a valid email id";
            return;
        }


        if(UserModel.password == undefined || UserModel.password == ""){
            UserModel.message = "Invalid password. Should have at least 6 characters";
            return;
        }

        LocalReadsService.signup($scope.userModel.userName,$scope.userModel.password)
        .then(function(response){
            $scope.userModel.message = response.message;
        });
    };

    $scope.login = function(){

        if(UserModel.userName == undefined || UserModel.userName == ""){
            UserModel.message = "Invalid Username. Should be a valid email id";
            return;
        }

        if(UserModel.password == undefined || UserModel.password == ""){
            UserModel.message = "Invalid password. Should have at least 6 characters";
            return;
        }

        LocalReadsService.login($scope.userModel.userName,$scope.userModel.password)
        .then(function(response){
            $scope.userModel.message = response.message;
            $scope.userModel.token = response.access_token;

            LocalReadsModelService.bootstrap();

            // navigate to home
            $state.go("app.home");
        });
    };
});
