angular.module('Pronto.meetup',[])
	.factory('MeetupFactory', ['$rootScope', function ($rootScope) {

		var meetupList = ['test'];

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
	.controller('MeetupCtrl', ['$scope', 'SocketFactory', 'MeetupFactory', function ($scope, SocketFactory, MeetupFactory) {
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
			console.log(this.meetup);
		}

		$scope.getMeetups();

	}]);