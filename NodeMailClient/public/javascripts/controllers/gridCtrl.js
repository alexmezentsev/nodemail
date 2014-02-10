'use strict';
var gridCtrl = function($scope, $http, $route, ngTableParams){
    $http({method: 'GET', url: '/api/getAllMails'}).
        success(function(data, status, headers, config) {
            $scope.mailsData = data.items;

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10           // count per page
            }, {
                total: $scope.mailsData.total, // length of data
                getData: function($defer, params) {
                    $defer.resolve($scope.mailsData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        }).
        error(function(data, status, headers, config) {

        });


};