
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


localreadsServices.service('BookService',
    ['$rootScope','$http','$q',
    function($rootScope,$http,$q){

        var booksData;
        var booksDataLoaded = false;

        var restBaseUrl = "https://localhost:8080";


        return{
            searchBooks:function(searchQuery){
                booksData = $q.defer();


                /* //ga_storage._trackEvent('Horoscope');
                if(!booksDataLoaded){

                    //horoscopeDataLoaded = true;
                    var params = {
                        query:searchQuery
                    };

                    $http.get(restBaseUrl + "/v1/books/search" ,params)
                        .then(function(response){
                            if(response.data.status==false){
                                navigator.notification.alert(response.message,
                                    function(){})
                                return;
                            }

                            console.log(response);

                            setTimeout(function(){
                                $rootScope.$apply(function(){
                                    booksData.resolve(response.data);
                                });
                            },100);
                        },function(error){
                            navigator.notification.alert("Please make sure you are on a WIFI or mobile data network.",
                                function(){})

                        }
                    );
                }*/

                return booksData.promise;
            }
        };
}]);


