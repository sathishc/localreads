
/**
 * Created with IntelliJ IDEA.
 * User: SatSang
 * Date: 9/2/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */


'use strict';


localreadsServices.service('LocalReadsModelService',
    ['$rootScope','$q','$filter',
        'UserModel','OwnershipsModel','HomeModel',
        'LocalReadsService',
        function($rootScope,$q,$filter,
                 UserModel,OwnershipsModel,HomeModel,
                 LocalReadsService){



            return{
                bootstrap:function(){
                    var self = this;
                    // populate data
                    this.getUserInfo()
                    .then(function(response){
                            console.log(true);
                       if(response){
                           self.getLatestBooks();
                           self.getOwnedBooks();
                       }
                    });

                },
                getUserInfo:function(){
                    var responseData = $q.defer();
                        LocalReadsService.getUserInfo(UserModel.userName)
                        .then(function(response){
                                UserModel.user = response;
                                responseData.resolve(true);
                        },(function(error){
                            console.log("Error in getting books")
                                responseData.resolve(false);
                        }));
                    return responseData.promise;
                },

                updateUserInfo:function(){
                    LocalReadsService.updateUserInfo()
                        .then(function(response){
                            if(response.status){
                                UserModel.user = response.user
                            }
                        });


                },


                getLatestBooks:function(){
                    var searchQuery = "none";
                    if(HomeModel.searchFilter.length > 3){
                        searchQuery = HomeModel.searchFilter
                    }
                    LocalReadsService.getBooksNearby(searchQuery)
                        .then(function(response){
                            if(response.status){
                                HomeModel.books = response.books;
                            }
                        },(function(error){
                            console.log("Error in getting books")
                        }));
                },


                addToShelf:function(volumeId){
                    LocalReadsService.addBookToShelf(volumeId)
                        .then(function(response){
                            if(response.status){ // status needs to be true from server
                                OwnershipsModel.ownerships.push(response.ownership);
                                console.log(OwnershipsModel.ownerships);
                            }
                        },(function(error){
                            console.log("Error in adding book to shelf");
                        }));
                },

                removeBookFromShelf:function(volumeId){
                    LocalReadsService.removeBookFromShelf(volumeId)
                        .then(function(response){
                            if(response.status){ // status needs to be true from server

                                OwnershipsModel.ownerships = $filter('filter')(OwnershipsModel.ownerships, function(value,index){
                                    return (value.id != response.id)
                                })
                            }
                        },(function(error){
                            console.log("Error in removing book to shelf");
                        }));
                },


                getOwnedBooks:function(){
                    LocalReadsService.getOwnerships()
                        .then(function(response){
                            if(response.status) { // status needs to be true from server
                                OwnershipsModel.ownerships = response.ownerships;
                            }
                        },(function(error){
                            console.log("Error in getting ownerships");
                        }));
                }
            };


        }]);


localreadsServices.filter('filterShelf', function (OwnershipsModel) {
    return function (books) {
        return _.filter(books,function(book){
            // return those books that dont contain their ids in the shelf
            return !_.contains(
                //map the Shelf books to their ids
                _.map(OwnershipsModel.ownerships,function(ownership){
                    return ownership.book.identifier;
                }),book.identifier);
        });
    };
});

localreadsServices.filter('filterSearch', function (OwnershipsModel) {
    return function (books) {

        return _.filter(books,function(book){
            // return those books that dont contain their ids in the shelf
            return !_.contains(
                //map the Shelf books to their ids
                _.map(OwnershipsModel.ownerships,function(ownership){
                    return ownership.book.identifier;
                }),book.identifier);
        });
    };
});






