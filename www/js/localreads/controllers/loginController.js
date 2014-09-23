'use strict';

localReadControllers.controller('LoginCtrl',
    function($scope,$state,
             UserModel,
             LocalReadsService,LocalReadsModelService) {
    $scope.userModel = UserModel;



    $scope.register = function(){
        if(UserModel.user.username == undefined || UserModel.user.username == ""){
            UserModel.message = "Invalid Username. Should be a valid email id";
            return;
        }


        if(UserModel.user.password == undefined || UserModel.user.password == ""){
            UserModel.message = "Invalid password. Should have at least 6 characters";
            return;
        }

        LocalReadsService.signup(
            $scope.userModel.user.username,
            $scope.userModel.user.password,
            $scope.userModel.user.displayName,
            $scope.userModel.user.imageUrl
        )
        .then(function(response){
                if(response.status){
                    $scope.userModel.message = response.message;
                    $scope.login();
                }
                else{
                    $scope.userModel.message = response.message;
                }
        });
    };

    $scope.login = function(){

        if(UserModel.user.username == undefined || UserModel.user.username == ""){
            UserModel.message = "Invalid Username. Should be a valid email id";
            return;
        }

        if(UserModel.user.password == undefined || UserModel.user.password == ""){
            UserModel.message = "Invalid password. Should have at least 6 characters";
            return;
        }

        LocalReadsService.login(UserModel.user.username,UserModel.user.password)
        .then(function(response){
            $scope.userModel.message = response.message;
            $scope.userModel.token = response.access_token;

            LocalReadsModelService.bootstrap();

            // navigate to home
            $state.go("app.home");
        });
    };


    $scope.loginGoogle = function(){
        window.plugins.googleplus.login(
            {
                'iOSApiKey': '838496901013-8tcuqretrsms9povdvadt9netabokqg0.apps.googleusercontent.com'
            },
            function (obj) {

                console.log(obj);

                UserModel.user.displayName = obj.displayName;
                UserModel.user.username = obj.email;
                UserModel.user.imageUrl = obj.imageUrl;

                $state.go("app.register");

            },
            function (msg) {
                alert('error: ' + msg);
            }
        );

    }
});
