'use strict';

angular.module('localreads.models', ['ngStorage'])

.factory('UserModel', function($localStorage) {
    //TODO revert to use localstorage after testing
    return {
        userName:"",
        password:"",
        searchRadius:"",
        latitude:51.5,
        longitude:0.0,
        token:"",
        message:"",
        signedUp:false,
        restBaseUrl:"http://localhost:8080/"
    };
    /*return $localStorage.$default({
        userName:"",
        password:"",
        searchRadius:"",
        latitude:51.5,
        longitude:0.0,
        token:"",
        message:"",
        signedUp:false,
        restBaseUrl:"http://localhost:8080/"
    });*/
})


.factory('HomeModel', function() {
    var books = [];
    return {
        books:books
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
    var settings = [];
    return {
        settings:settings
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

