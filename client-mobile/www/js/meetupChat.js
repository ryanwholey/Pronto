angular.module('Pronto.meetupChat', [])



.controller('MeetupChatCtrl', ['$scope', '$stateParams', 'SocketFactory', function ($scope, $stateParams, SocketFactory) {
  $scope.messages = [];
  $scope.messageObj = {};
  $scope.getMessages = function() {
    SocketFactory.emit('getMessages');
  };

  SocketFactory.on('msgIn', function(messages)  {
    $scope.messages = messages[$stateParams.room];
  });

  $scope.postMessage = function(message)  {
    SocketFactory.emit('msgOut', {message: message, room: $stateParams.room});
    $scope.messageObj.message = '';
  }
}]);