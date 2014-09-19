'use strict';

localReadControllers.controller('InboxCtrl', function($scope,$state,InboxModel,ConversationModel) {

    $scope.inboxModel = InboxModel;

    $scope.inboxModel.openConversation = function(conversation){
        console.log(conversation);
        ConversationModel.activeConversation = conversation;
        $state.go("app.conversation");
    }
});
