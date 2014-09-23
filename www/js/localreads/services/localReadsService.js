
/**
 * Created with IntelliJ IDEA.
 * User: SatSang
 * Date: 9/2/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */


'use strict';


localreadsServices.service('LocalReadsService',
    ['$rootScope','$http','$q','UserModel',
        function($rootScope,$http,$q,UserModel){

            var restBaseUrl = UserModel.restBaseUrl;

            return{
                login:function(userName,password){

                    var params = {
                        username:userName,
                        password:password
                    };
                    return getLoginResponse('POST','api/login',params,params);
                },
                getUserInfo:function(userId){
                    return getHttpResponse('GET','api/users/' + userId);
                },
                updateUserInfo:function(userId){
                    var params = {
                        latitude:UserModel.user.latitude,
                        longitude:UserModel.user.longitude,
                        searchRadius:UserModel.user.searchRadius
                    };

                    return getHttpResponse('POST','api/users/',params);
                },
                logout:function(){
                    return getHttpResponse('POST','api/logout');
                },
                signup:function(userName,password,displayName,imageUrl){
                    var params = {
                        username:userName,
                        password:password,
                        displayName:displayName,
                        imageUrl:imageUrl,
                        latitude:13.9,
                        longitude:75.5};
                    return getHttpResponse('POST','register/add',params,params);
                },
                getBooksNearby:function(searchFilter){
                    return getHttpResponse('GET','api/ownerships/search/' + searchFilter);
                },
                addBookToShelf:function(volumeId){
                    return getHttpResponse('GET','api/ownerships/create/' + volumeId);
                },
                removeBookFromShelf:function(volumeId){
                    return getHttpResponse('DELETE','api/ownerships/' + volumeId);
                },
                getOwnerships:function(volumeId){
                    return getHttpResponse('GET','api/ownerships/');
                },
                sendBookRequest:function(userId,messageText){
                    var params = {
                        withUserId:userId,
                        messageText:messageText
                        };
                    return getHttpResponse('GET','api/conversations/create',params);
                },
                getConversations:function(){
                    return getHttpResponse('GET','api/conversations/');
                },
                getConversation:function(conversationId){
                    return getHttpResponse('GET','api/conversations/' + conversationId);
                },
                updateConversation:function(conversationId,messageText){
                    var params = {
                        id:conversationId,
                        message:messageText
                    };
                    return getHttpResponse('POST','api/conversations/',params);
                },
                deleteConversation:function(conversationId){

                    return getHttpResponse('DELETE','api/conversations/' + conversationId);
                }
            };

            function getHttpResponse(method, url, params, data){
                var responseData = $q.defer();

                $http({
                        method:method,
                        url: restBaseUrl + url,
                        params:params,
                        data:data
                    })
                    .then(function(response){
                        setTimeout(function(){
                            $rootScope.$apply(function(){
                                responseData.resolve(response.data);
                            });
                        },100);
                    },function(error){
                        console.log(error);
                    }
                );

                return responseData.promise;
            }

            function getLoginResponse(method, url, params, data){
                var responseData = $q.defer();

                $http({
                    method:method,
                    url: restBaseUrl + url,
                    params:params,
                    data:data
                })
                    .then(function(response){
                        setTimeout(function(){
                            $rootScope.$apply(function(){
                                responseData.resolve(response.data);
                            });
                        },100);
                    },function(error){
                        console.log(error);
                    }
                );

                return responseData.promise;
            }
        }]);





