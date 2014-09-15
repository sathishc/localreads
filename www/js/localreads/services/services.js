
/**
 * Created with IntelliJ IDEA.
 * User: SatSang
 * Date: 9/2/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */


'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var localreadsServices = angular.module('localreads.services', []);

//define the interceptors
localreadsServices.factory('401Interceptor',
    ['$rootScope','$q','UserModel',
    function($rootScope, $q,UserModel) {
        return {
            request: function(config) {
                console.log(config.url);
                if(config.url.indexOf(UserModel.restBaseUrl)>-1){
                    config.headers.Authorization = UserModel.token;
                }
                return config;
            },
            responseError: function(rejection) {
                if(rejection.status == 401){

                    $rootScope.$emit("authFailed");
                    console.log("Emitting authFailed ");
                }
                return $q.reject(rejection);
            }
        };
    }]);

localreadsServices.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('401Interceptor');
}]);




