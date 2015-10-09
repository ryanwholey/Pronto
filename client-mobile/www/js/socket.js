angular.module('Pronto.socket', [])

.factory('SocketFactory', ['$location', '$rootScope', function ($location, $rootScope) {
  var socketFact = {};

  //hacky way to make this work in developer environments at specified port number
  socketFact.host = "10.8.4.153:3000";

  //socketFact.host = $location.host() !== "localhost" ? $location.host() : "localhost:3000";

  socketFact.connect = function (nameSpace) {
    if (!nameSpace) {
      return io.connect(this.host, { forceNew: true });
    } else {
      return io.connect(this.host + "/" + nameSpace);
    }
  };

  var socket = io.connect(socketFact.host);

  socketFact.on = function(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function()  {
        if(callback)  {
          callback.apply(socket, args);
        }
      });
    });
  };

  socketFact.emit = function(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      var args = arguments;
      $rootScope.$apply(function()  {
        if(callback)  {
          callback.apply(socket, args);
        }
      });
    });
  };

  return socketFact;
}]);
