
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
                        latitude:UserModel.user.location.y,
                        longitude:UserModel.user.location.x,
                        searchRadius:UserModel.user.settings.searchRadius
                    };

                    return getHttpResponse('POST','api/users/',params);
                },
                logout:function(){

                    return getHttpResponse('POST','api/logout');
                },
                signup:function(userName,password){
                    var params = {
                        username:userName,
                        password:password,
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


localreadsServices.factory('LocalReadsRedirectService',
    ['$rootScope','$state',
        function($rootScope,$state){
            $rootScope.$on('authFailed',function(event){
                console.log("received autFailed");
                $state.go('app.login');
            });
        }
    ]);




