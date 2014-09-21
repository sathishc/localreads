'use strict';

angular.module('localreads.models', ['ngStorage'])

.factory('UserModel', function($localStorage) {
    var user,token;
    return $localStorage.$default({
        user:user,
        token:token,
        restBaseUrl:"http://130.211.252.177/"
    });

})


.factory('HomeModel', function() {
    var ownerships = [];
    var searchFilter = "";
    return {
        ownerships:ownerships,
        searchFilter:searchFilter
    };
})

.factory('RequestModel', function() {
    var activeBook;
    var activeUserId;
    var userMessage;
    return {
        activeBook:activeBook,
        activeUserId:activeUserId,
        userMessage:userMessage
    };
})

.factory('InboxModel', function() {
    var conversations = [];
    return {
        conversations:conversations
    };
})

.factory('ConversationModel', function() {
    var activeConversation;
    var activeMessage;
    return {
        activeConversation:activeConversation,
        activeMessage:activeMessage
    };
})


.factory('OwnershipsModel', function() {
    var ownerships = [];
    return {
        ownerships:ownerships
    };
})

.factory('WishListModel', function() {
    var books = [];
    return {
        books:books
    };
})

.factory('SettingsModel', function() {
    var placeName;
    return {
        placeName:placeName
    };
})

.factory('InboxModel', function() {
    var conversations = [];
    return {
        conversations:conversations
    };
})

.factory('SearchResultsModel', function() {
        var searchResults = [];
        var searchResultCount = 0;
        var searchQuery = '';
    return {
        searchResults:searchResults,
        searchResultCount:searchResultCount,
        searchQuery:searchQuery
    };
});

