function inboxCtrl($scope, $rootScope, $http, $route, $filter, $q, ngTableParams) {
    $rootScope.folder = 0;
    gridCtrl($scope, $rootScope, $http, $route, $filter, $q, ngTableParams);
};