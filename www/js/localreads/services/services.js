
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
                    //if this is a login url - set a message and return
                    if(rejection.config.url.indexOf("/api/login")!= -1){
                        UserModel.message = "Incorrect Username or Password";
                    }
                    else{ // emit an event to transition the page to login
                        console.log("Auth failed for");
                        console.log(rejection.config.url);

                        $rootScope.$emit("loginReadsAuthFailed");
                    }
                }else{
                    UserModel.message = "Error connecting to server";
                    $rootScope.$emit("loginReadsAuthFailed");
                }
                return $q.reject(rejection);
            }
        };
    }]);

localreadsServices.service('googlePlaceService', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
        var d = $q.defer();
        function onScriptLoad() {
            // Load client in the browser
            $rootScope.$apply(function() { d.resolve(window.d3); });
        }
        // Create a script tag with d3 as the source
        // and call our onScriptLoad callback when it
        // has been loaded
        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = true;
        scriptTag.src = 'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&' + 'callback=initialize';
        scriptTag.onreadystatechange = function () {
            if (this.readyState == 'complete') onScriptLoad();
        };
        scriptTag.onload = onScriptLoad;

        var s = $document[0].getElementsByTagName('body')[0];
        s.appendChild(scriptTag);

        return {
            d3: function() { return d.promise; }
        };
    }
]);

localreadsServices.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('401Interceptor');
}]);






