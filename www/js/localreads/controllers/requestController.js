'use strict';

localReadControllers.controller('RequestCtrl',
    function($scope,$state,
            InboxModel,RequestModel,
            LocalReadsModelService) {

    $scope.requestModel = RequestModel;


    $scope.requestModel.sendMessage = function(){
        var messageText = $scope.requestModel.baseMessage() + " " + $scope.requestModel.userMessage;

        console.log(messageText);
        LocalReadsModelService.sendBookRequest($scope.requestModel.activeUserId,messageText);

        $state.go("app.home");
    };


    $scope.requestModel.baseMessage = function(){
        return "Hi, I am interested in borrowing the book " + $scope.requestModel.activeBook.name + " from you. "
    };
});
