// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Pronto', [
  'ionic',
  'Pronto.auth',
  'Pronto.match',
  'Pronto.socket',
  'Pronto.chat',
  'Pronto.meetupList',
  'Pronto.meetupChat'
])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.user = {};
  $rootScope.host = 'http://10.8.4.153:3000'; // 10.8.2.104
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    navigator.geolocation.getCurrentPosition(function(data){
      $rootScope.coords = {lat: data.coords.latitude, lng: data.coords.longitude};
    });

  });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.common = {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // Each tab has its own nav history stack:

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'AuthCtrl'
  })

  .state('match', {
    url: '/match',
    templateUrl: 'templates/match.html',
    controller: 'MatchCtrl'
  })

  .state('load', {
    url: '/load',
    templateUrl: 'templates/load.html',
    controller: 'MatchCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'ChatCtrl'
  })

  .state('meetupList', {
    url: '/meetupList',
    templateUrl: 'templates/meetupList.html',
    controller: 'MeetupListCtrl'
  })

  .state('meetupChat', {
    url: '/meetupChat/:room',
    templateUrl: 'templates/meetupChat.html',
    controller: 'MeetupChatCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
