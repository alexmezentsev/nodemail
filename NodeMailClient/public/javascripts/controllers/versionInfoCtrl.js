function versionInfoCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/versionInfo'}).
        success(function(data, status, headers, config) {
            $scope.version = data.version;
        }).
        error(function(data, status, headers, config) {
            $scope.version = 'Error'
        });
};