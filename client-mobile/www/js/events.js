angular.module('Pronto.events',[])
	.controller('EventsCtrl',  ['$scope', 'SocketFactory', function ($scope, SocketFactory) {
		var eventFact = {};
		$scope.eventObj = {'blurb':''};

		$scope.createEvent = function(){
			console.log('create event');
			eventFact.socket = SocketFactory.connect('event', $scope.eventObj.blurb);
			console.log($scope.eventObj.blurb);
			$scope.eventObj.blurb = '';
		};
		
	}])