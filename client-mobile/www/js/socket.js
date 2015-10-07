angular.module('Pronto.socket', [])

.factory('SocketFactory', ['$location', function ($location) {
  var socketFact = {};

  //hacky way to make this work in developer environments at specified port number
  socketFact.host = '10.8.4.153:3000'
  // socketFact.host = $location.host() !== "localhost" ? $location.host() : "localhost:3000";

  socketFact.connect = function (nameSpace) {
    if (!nameSpace) {
      return io.connect(this.host, { forceNew: true });
    } else {
      return io.connect(this.host + "/" + nameSpace);
    }
  };

  return socketFact;
}]);
