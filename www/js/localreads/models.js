angular.module('localreads.models', [])

.factory('SettingsModel', function() {
    var settings = [];
    return {
        settings:settings
    };
})

.factory('ShelfModel', function() {
    var shelfItems = [];
    return {
        shelfItems:shelfItems
    };
})

.factory('WishListModel', function() {
    var wishList = [];
    return {
        wishList:wishList
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

