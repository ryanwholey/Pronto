angular.module('Pronto.match', [])

.factory('MatchFactory', ['$state', 'SocketFactory', '$window', '$rootScope', function ($state, SocketFactory, $window, $rootScope) {
  var matchFact = {};

  matchFact.connectSocket = function () {
    this.socket = SocketFactory.connect("match");
  };

  matchFact.postMatch = function () {
    this.socket.emit('matching', $rootScope.user);
    this.socket.on('matched', function (data) {
      $rootScope.chatRoomId = data;
      $rootScope.$apply(function () {
        $state.go('chat');
      });
    });
  };

  return matchFact;
}])

.controller('MatchCtrl', ['$rootScope', '$state', '$scope', 'MatchFactory', 'AuthFactory', function ($rootScope, $state, $scope, MatchFactory, AuthFactory) {
  $rootScope.disableButton = false;

  $scope.connect = function() {
    MatchFactory.connectSocket();
  };

  $scope.submit = function () {
    $rootScope.disableButton = true;
    MatchFactory.postMatch();
    $state.go('load');
  };

  $scope.logOut = function () {
    $rootScope.disableButton = false;
    AuthFactory.logOut();
  };
  $scope.connect();
  console.log('called connect');
  $scope.submit();
  console.log('called submit');
}]);
