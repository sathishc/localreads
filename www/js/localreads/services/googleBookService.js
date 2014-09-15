
/**
 * Created with IntelliJ IDEA.
 * User: SatSang
 * Date: 9/2/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */


'use strict';


localreadsServices.service('googleBookService',
    ['$rootScope','$http','$q',
    function($rootScope,$http,$q){

        var booksData;
        var booksDataLoaded = false;
        var restBaseUrl = "https://www.googleapis.com/";
        return{
            searchBooks:function(searchQuery){
                booksData = $q.defer();

                var params = {
                    'q':searchQuery,
                    'projection':'lite',
                    'maxResults':40
                };

                $http({method:'GET',url: restBaseUrl + "books/v1/volumes", params:params})
                    .then(function(response){

                        if(response.data.status==false){
                            navigator.notification.alert(response.message,
                                function(){});
                            return;
                        }
                        console.log(response);

                        setTimeout(function(){
                            $rootScope.$apply(function(){
                                booksData.resolve(response.data);
                            });
                        },100);
                    },function(error){
                        console.log(error);
                    }
                );

                return booksData.promise;
            }
        };
}]);






