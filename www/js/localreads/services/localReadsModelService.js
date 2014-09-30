
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
        'UserModel','OwnershipsModel','HomeModel','InboxModel','ConversationModel','SettingsModel',
        'LocalReadsService',
        function($rootScope,$q,$filter,
                 UserModel,OwnershipsModel,HomeModel,InboxModel,ConversationModel,SettingsModel,
                 LocalReadsService){


            function validateLatLong(userDetails){
                if(!_.isNumber(userDetails.latitude) || !_.isNumber(userDetails.longitude)){
                    $rootScope.$emit("loginReadsLatLongNotSet");
                }
            }

            function setupConversationChannel(){
                var socket = new SockJS(UserModel.restBaseUrl + "stomp");
                var client = Stomp.over(socket);

                client.connect(
                    {}, function(frame) {

                        console.log(frame);

                        client.subscribe("/queue/conversations/" + UserModel.token , function(message) {

                            var conversationDetails = JSON.parse(message.body);
                            var conversation = _.find(InboxModel.conversations,function(conversation){
                                return conversation.id == conversationDetails.id;
                            });

                            $rootScope.$apply(function(){
                                if(conversation){ // found a conversation, so add the snippet to it
                                    conversation.snippets.push(conversationDetails.snippet);
                                }else{
                                    // no existing conversation. create a new one
                                    var newConversation = {
                                        'id':conversationDetails.id,
                                        receiverName:conversationDetails.receiverName
                                    };
                                    newConversation.snippets = [];
                                    newConversation.snippets.push(conversationDetails.snippet);
                                    InboxModel.conversations.push(newConversation);
                                }
                            });
                        });
                    });
            }

            return{
                bootstrap:function(){
                    var self = this;
                    // populate data
                    this.getUserInfo()
                    .then(function(response){
                       if(response){

                           setupConversationChannel();

                           self.getBooksNearby();
                           self.getOwnedBooks();
                           self.getConversations();
                       }
                    });

                },
                logout:function(){
                    LocalReadsService.logout();
                },
                getUserInfo:function(){
                    var responseData = $q.defer();
                        LocalReadsService.getUserInfo(UserModel.userName)
                        .then(function(response){

                                validateLatLong(response.user);

                                UserModel.user = response.user;
                                responseData.resolve(true);
                        },(function(error){
                            console.log("Error in getting User");
                                responseData.resolve(false);
                        }));
                    return responseData.promise;
                },
                setCurrentLocation:function(){
                    var responseData = $q.defer();
                    navigator.geolocation.getCurrentPosition(
                        function(point){
                            $rootScope.$apply(function(){
                                UserModel.user.latitude = point.coords.latitude;
                                UserModel.user.longitude = point.coords.longitude;
                                SettingsModel.settingsMessage = "Set current location success";
                            });
                            responseData.resolve(true);
                        },
                        function(error){
                            $scope.$apply(function(){
                                SettingsModel.settingsMessage = "Could not set to current location";
                            });
                            responseData.resolve(false);
                        }
                    );
                    return responseData.promise;
                },

                updateUserInfo:function(){
                    LocalReadsService.updateUserInfo()
                        .then(function(response){
                            if(response.status){
                                UserModel.user.latitude = response.user.latitude;
                                UserModel.user.longitude = response.user.longitude;
                                UserModel.user.searchRadius = response.user.searchRadius;
                            }
                        });
                },


                getBooksNearby:function(){
                    var searchQuery = "none";
                    if(HomeModel.searchFilter.length > 3){
                        searchQuery = HomeModel.searchFilter
                    }
                    var defer = $q.defer();

                    LocalReadsService.getBooksNearby(searchQuery)
                    .then(function(response){
                        if(response.status){
                            HomeModel.ownerships = response.ownerships;
                        }else{
                            HomeModel.ownerships = [];
                        }
                        defer.resolve(true);
                    },(function(error){
                        defer.resolve(true);
                        console.log("Error in getting books");
                    }));
                    return defer.promise;
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
                },

                sendBookRequest:function(userId,messageText){
                    LocalReadsService.sendBookRequest(userId,messageText)
                        .then(function(response){
                            if(response.status) { // status needs to be true from server
                                //InboxModel.conversations.push(response.conversation);

                                //should add snippet to a conversation if it already exists
                                var existing = _.find(InboxModel.conversations,function(conversation){
                                    return conversation.id == response.conversation.id;
                                });
                                if(existing){
                                    //replace the existing snippets with new ones
                                    existing.snippets = response.conversation.snippets;
                                }else{
                                    //push this as a new conversation
                                    InboxModel.conversations.push(response.conversation);
                                }

                            }
                        },(function(error){
                            console.log("Error in getting ownerships");
                        }));
                },

                sendComment:function(conversationId,messageText){
                    LocalReadsService.updateConversation(conversationId,messageText)
                        .then(function(response){
                            if(response.status) { // status needs to be true from server

                                //should add snippet to a conversation if it already exists
                                var existing = _.find(InboxModel.conversations,function(conversation){
                                    return conversation.id == response.conversation.id;
                                });

                                if(existing){
                                    //replace the existing snippets with new ones
                                    existing.snippets = response.conversation.snippets;
                                }

                                ConversationModel.activeMessage = "";

                            }
                        },(function(error){
                            console.log("Error in getting ownerships");
                        }));
                },

                getConversations:function(){
                    LocalReadsService.getConversations()
                        .then(function(response){
                            if(response.status) { // status needs to be true from server
                                InboxModel.conversations = response.conversations;
                            }
                        },(function(error){
                            console.log("Error in getting ownerships");
                        }));
                }
            };


        }]);


//filter out books that are in your shelf from the books nearby (in Home)
localreadsServices.filter('filterShelf', function (OwnershipsModel) {
    return function (ownerships) {
        return _.filter(ownerships,function(ownership){
            // return those books that dont contain their ids in the shelf
            return !_.contains(
                //map the Shelf books to their ids
                _.map(OwnershipsModel.ownerships,function(ownership){
                    return ownership.book.identifier;
                }),ownership.book.identifier);
        });
    };
});

//filter out books that are in your shelf from search results in AddBooks page
localreadsServices.filter('filterSearch', function (OwnershipsModel) {
    return function (books) {
        return _.filter(books,function(book){
            // return those books that dont contain their ids in the shelf
            return !_.contains(
                //map the Shelf books to their ids
                _.map(OwnershipsModel.ownerships,function(ownership){
                    return ownership.book.identifier;
                }),book.id);
        });
    };
});






