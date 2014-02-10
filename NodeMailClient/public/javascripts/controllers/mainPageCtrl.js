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
};