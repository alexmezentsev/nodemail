'use strict';

function appCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/userLogin'}).
        success(function(data, status, headers, config) {
            $scope.userlogin = data.login;
        }).
        error(function(data, status, headers, config) {
            $scope.userlogin = ''
        });
};