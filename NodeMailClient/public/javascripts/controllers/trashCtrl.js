function trashCtrl($scope, $http, $rootScope, $route, $filter, $q, ngTableParams) {
    $rootScope.folder = 2;
    gridCtrl($scope, $rootScope, $http, $route, $filter, $q, ngTableParams);
};