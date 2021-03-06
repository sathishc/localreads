// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('localreads',
    ['ionic',
        'ngStorage',
        'localreads.controllers',
        'localreads.models',
        'localreads.directives',
        'localreads.services'])

.run(function($ionicPlatform,$rootScope,$state, LocalReadsModelService) {
      $ionicPlatform.ready(function() {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }

          //bootstrap the data
          LocalReadsModelService.bootstrap();

      });

      $rootScope.$on('loginReadsAuthFailed',function(event){
            console.log("received autFailed");
            $state.go('app.login');
      });

        $rootScope.$on('loginReadsLatLongNotSet',function(event){
            console.log("Need to set lat or long");
            $state.go('app.settings');
        });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
        })

        .state('app.login', {
            url: "/login",
            views: {
                'menuContent' :{
                    templateUrl: "templates/login.html",
                    controller: 'LoginCtrl'
                }
            }
        })

        .state('app.register', {
            url: "/register",
            views: {
                'menuContent' :{
                    templateUrl: "templates/register.html",
                    controller: 'LoginCtrl'
                }
            }
        })


        .state('app.home', { // display nearby books
          url: "/home",
          views: {
            'menuContent' :{
              templateUrl: "templates/home.html",
              controller: 'HomeCtrl'
            }
          }
        })

        .state('app.request', { // display nearby books
            url: "/request",
            views: {
                'menuContent' :{
                    templateUrl: "templates/request.html",
                    controller: 'RequestCtrl'
                }
            }
        })

        .state('app.conversation', { // display nearby books
            url: "/conversation",
            views: {
                'menuContent' :{
                    templateUrl: "templates/conversation.html",
                    controller: 'ConversationCtrl'
                }
            }
        })

        .state('app.search', {  //search to add books
            url: "/search",
            views: {
                'menuContent' :{
                    templateUrl: "templates/search.html",
                    controller: 'SearchCtrl'
                }
            }
        })

        .state('app.shelf', { // display shelf
            url: "/shelf",
            views: {
                'menuContent' :{
                    templateUrl: "templates/shelf.html",
                    controller: 'ShelfCtrl'
                }
            }
        })

        .state('app.inbox', { // display shelf
            url: "/inbox",
            views: {
                'menuContent' :{
                    templateUrl: "templates/inbox.html",
                    controller: 'InboxCtrl'
                }
            }
        })

        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent' :{
                    templateUrl: "templates/settings.html",
                    controller: 'SettingsCtrl'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

});

