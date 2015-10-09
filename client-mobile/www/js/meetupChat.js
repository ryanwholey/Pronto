angular.module('Pronto.meetupChat', [])



.controller('MeetupChatCtrl', ['$scope', '$stateParams', 'SocketFactory', '$rootScope', function ($scope, $stateParams, SocketFactory, $rootScope) {
  $scope.messages = [];
  $scope.messageObj = {
    userName: $rootScope.user.name,
    Message: ''
  };
  $scope.getMessages = function() {
    SocketFactory.emit('getMessages');
  };

  SocketFactory.on('msgIn', function(messages)  {
    $scope.messages = messages[$stateParams.room];
  });

  $scope.postMessage = function(message)  {
    SocketFactory.emit('msgOut', {message: message, room: $stateParams.room, userName: $rootScope.user.name});
    $scope.messageObj.message = '';
  }
}]);