function mainPageCtrl($scope, $rootScope, $http, $location) {
//    $http({method: 'GET', url: '/api/getAllMails/0'}).
//        success(function(data, status, headers, config) {
//            $scope.inboxCount = data.total;
//        }).
//        error(function(data, status, headers, config) {
//
//        });
//    $scope.isActive = function(route) {
//        return route === $location.path();
//    };
//
//    $http({method: 'GET', url: '/api/getAllMails/1'}).
//        success(function(data, status, headers, config) {
//            $scope.sentCount = data.total;
//        }).
//        error(function(data, status, headers, config) {
//
//        });
//    $scope.isActive = function(route) {
//        return route === $location.path();
//    };
//
//    $http({method: 'GET', url: '/api/getAllMails/2'}).
//        success(function(data, status, headers, config) {
//            $scope.trashCount = data.total;
//        }).
//        error(function(data, status, headers, config) {
//
//        });
//    $scope.isActive = function(route) {
//        return route === $location.path();
//    };

    var socket = io.connect('http://localhost');
    socket.on('mails' , function (newData) {
        $scope.$apply(function(){
            $scope.inboxCount = newData.total;
        });
    });

    socket.on('trashCount' , function (newData) {
        $scope.$apply(function(){
            $scope.trashCount = newData;
        });
    });

    socket.on('sentCount' , function (newData) {
        $scope.$apply(function(){
            $scope.sentCount = newData;
        });
    });
};