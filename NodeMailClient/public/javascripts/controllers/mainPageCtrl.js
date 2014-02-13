function mainPageCtrl($scope, $http, $location) {
    $http({method: 'GET', url: '/api/getAllMails'}).
        success(function(data, status, headers, config) {
            $scope.newMailsCount = data.total;
        }).
        error(function(data, status, headers, config) {

        });
    $scope.isActive = function(route) {
        return route === $location.path();
    };
    var socket = io.connect('http://localhost');
    socket.on('mails' , function (newData) {
        $scope.$apply(function(){
            $scope.newMailsCount = newData.total;
        });
        console.log($scope.newMailsCount);
    });
};