'use strict';

localReadControllers.controller('ConversationCtrl',
    function($scope,
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
    }


});
