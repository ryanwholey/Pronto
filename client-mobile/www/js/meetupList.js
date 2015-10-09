angular.module('Pronto.meetupList', [])

.factory('MeetupListFactory', function () {
  var meetups = [];

  var getMeetups = function() {
    return meetups;
  }

  var addMeetup = function(meetupName)  {
    //check for duplicates
    meetups.push(meetupName);
    console.log(meetups);
  }

  var removeMeetup = function(meetupName) {
    for (var i = 0; i < meetups.length; i++) {
      if (meetups[i] === meetupName)  {
        meetups.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  return {
    getMeetups: getMeetups,
    addMeetup: addMeetup,
    removeMeetup: removeMeetup
  }
})

.controller('MeetupListCtrl', ['MeetupListFactory', '$scope', 'SocketFactory', '$state', function (MeetupListFactory, $scope, SocketFactory, $state) {
  $scope.meetups = [];
  $scope.newRoom = {};

  $scope.getMeetups = function()  {
    $scope.meetups = MeetupListFactory.getMeetups();
  };

  $scope.addMeetup = function()  {
    MeetupListFactory.addMeetup($scope.newRoom.name);
    $scope.newRoom.name = '';
    $scope.getMeetups();
  }

  $scope.meetupClick = function(roomName) {
    $state.go('meetupChat', {room: roomName});
  }


}]);