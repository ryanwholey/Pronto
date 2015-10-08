angular.module('Pronto.meetup',['ui.router'])
	.factory('MeetupFactory', ['$rootScope', function ($rootScope) {

		var meetupList = ['event','event2'];

		var addMeetup = function(meetupName) {
			meetupList.push(meetupName);
		};

		var removeMeetup = function(meetupName) {
			var removed = false;
			for(var i = 0; i < meetupList.length; i++){
				if(meetupList[i]===meetupName){
					meetupList.splice(i,1);
					removed = true;
					break;
				}
			}
			return removed;
		};

		var getMeetups = function(){
			return meetupList;
		};

		return {
			addMeetup : addMeetup,
			removeMeetup : removeMeetup,
			getMeetups : getMeetups
		}

	}])
	.controller('MeetupCtrl', ['$rootScope','$scope', '$state','SocketFactory', 'MeetupFactory', function ($scope, $rootScope, $state, SocketFactory, MeetupFactory) {
		var meetupFact = {};
		$scope.meetupObj = {blurb:''};
		meetupFact.socket = SocketFactory.connect('meetup', $scope.meetupObj.blurb);

		$scope.createMeetup = function(){
			console.log('create meetup');
			MeetupFactory.addMeetup($scope.meetupObj.blurb);
			$scope.meetupObj.blurb = '';
		};

		$scope.getMeetups = function(){
			$scope.meetups = MeetupFactory.getMeetups();
		};

		$scope.toMeetup = function() {
			$rootScope.chatRoomId = this.meetupName;
			$state.go('load');
		};

		$scope.getMeetups();

	}]);