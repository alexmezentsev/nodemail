function sentCtrl($scope, $rootScope, $http, $route, $filter, $q, ngTableParams) {
    $rootScope.folder = 1;
    gridCtrl($scope, $rootScope, $http, $route, $filter, $q, ngTableParams);
};