angular.module('Pronto.events',[])
	.controller('EventsCtrl', ['$scope', 'SocketFactory', function ($scope, SocketFactory) {
		var eventFact = {};
		$scope.eventVar = '';
		eventFact.socket = SocketFactory.connect('event', $scope.blurb);

		$scope.createEvent = function(){
			console.log('create event');
			console.log($scope.eventVar);
			// $scope='';
		}
	}])