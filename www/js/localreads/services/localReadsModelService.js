
/**
 * Created with IntelliJ IDEA.
 * User: SatSang
 * Date: 9/2/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */


'use strict';


localreadsServices.service('LocalReadsModelService',
    ['$rootScope',
        'UserModel','OwnershipsModel','HomeModel',
        'LocalReadsService',
        function($rootScope,
                 UserModel,OwnershipsModel,HomeModel,
                 LocalReadsService){


            function updateHome(response){
                HomeModel.books = response;

            }

            function updateShelf (response){

                OwnershipsModel.books = response.books;
                OwnershipsModel.ownerships = response.ownerships;
            }

            return{

                getLatestBooks:function(){
                    LocalReadsService.getBooks()
                        .then(function(response){
                            updateHome(response);
                        },(function(error){
                            console.log("Error in getting books")
                        }));
                },
                addToShelf:function(volumeId){
                    LocalReadsService.addBookToShelf(volumeId)
                        .then(function(response){
                            OwnershipsModel.books.push(response.book);
                        },(function(error){
                            console.log("Error in adding book to shelf");
                        }));
                },
                getOwnedBooks:function(volumeId){
                    LocalReadsService.getOwnerships()
                        .then(function(response){
                            updateShelf(response);
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
                _.map(OwnershipsModel.books,function(shelfBook){
                    return shelfBook.identifier;
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
                _.map(OwnershipsModel.books,function(shelfBook){
                    return shelfBook.identifier;
                }),book.id);
        });
    };
});






