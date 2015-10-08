angular.module('Pronto.events',[])
	.factory('EventsFactory', ['$rootScope', function ($rootScope) {

		var eventList = [];

		addEvent = function(eventName) {
			eventList.push(eventName);
		};

		removeEvent = function(eventName) {
			var removed = false;
			for(var i = 0; i < eventList.length; i++){
				if(eventList[i]===eventName){
					eventList.splice(i,1);
					removed = true;
					break;
				}
			}
			return removed;
		};

		getEvents = function(){
			return eventList;
		}

		return {
			addEvent : addEvent,
			removeEvent : removeEvent,
			getEvents : getEvents
		}

	}])
	.controller('EventsCtrl', ['$scope', 'SocketFactory', 'EventsFactory', function ($scope, SocketFactory, EventsFactory) {
		var eventFact = {};
		$scope.eventObj = {blurb:''};

		$scope.createEvent = function(){
			console.log('create event');
			eventFact.socket = SocketFactory.connect('event', $scope.eventObj.blurb);
			EventsFactory.addEvent($scope.eventObj.blurb);
			$scope.eventObj.blurb = '';
		};

		$scope.getEvents = function(){
			$scope.events = EventsFactory.getEvents();
		};


	}])