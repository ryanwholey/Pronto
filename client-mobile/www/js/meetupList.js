angular.module('Pronto.meetupList', [])


.controller('MeetupListCtrl', ['$scope', 'SocketFactory', '$state', function ($scope, SocketFactory, $state) {
  $scope.meetups = [];
  $scope.newRoom = {};

  $scope.getMeetups = function()  {
    SocketFactory.emit('getMeetups');
  };

  SocketFactory.on('mtpIn', function(meetups) {
    $scope.meetups = meetups;
  });

  $scope.addMeetup = function()  {
    SocketFactory.emit('mtpOut', $scope.newRoom.name);
    $scope.newRoom.name = '';
  }

  $scope.meetupClick = function(roomName) {
    $state.go('meetupChat', {room: roomName});
  }


}]);