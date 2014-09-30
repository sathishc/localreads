'use strict';

localReadControllers.controller('ConversationCtrl',
    function($scope,$ionicScrollDelegate,
            UserModel,
            ConversationModel,
            LocalReadsModelService) {

    $scope.conversationModel = ConversationModel;


    $scope.conversationModel.sendMessage = function(){
        LocalReadsModelService
            .sendComment(ConversationModel.activeConversation.id,ConversationModel.activeMessage);
    };

    $scope.isCurrentUserSnippet = function(snippet){
         return snippet.senderUserId == UserModel.user.id;
    };

    $scope.$watch('conversationModel.activeConversation.snippets.length',function(newValue,oldValue){
        if(newValue != oldValue){
            $ionicScrollDelegate.$getByHandle('activeConversationContent').scrollBottom(true);
        }
    });

    $scope.$watch('conversationModel.activeConversation',function(newValue,oldValue){
        $ionicScrollDelegate.$getByHandle('activeConversationContent').scrollBottom();
    });


});
