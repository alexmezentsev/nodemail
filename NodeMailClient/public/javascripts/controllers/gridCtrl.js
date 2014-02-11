'use strict';
var gridCtrl = function($scope, $http, $route, $filter, $q, ngTableParams){
    $http({method: 'GET', url: '/api/getAllMails'}).
        success(function(data, status, headers, config) {
            $scope.mailsData = data.items;
            $scope.totalMails = data.total;
            $scope.buildTable();
        }).
        error(function(data, status, headers, config) {

        });

    $scope.buildTable = function(){
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.totalMails, // length of data
            getData: function($defer, params) {
//                var orderedData = params.sorting() ?
//                    $filter('orderBy')($scope.mailsData, params.orderBy()) :
//                    $scope.mailsData;
//                orderedData = params.filter() ?
//                    $filter('filter')(orderedData, params.filter()) :
//                    orderedData;
//
//                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.mailsData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        var inArray = Array.prototype.indexOf ?
            function (val, arr) {
                return arr.indexOf(val)
            } :
            function (val, arr) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) return i;
                }
                return -1
            };
        $scope.names = function(column) {
            var def = $q.defer(),
                arr = [],
                names = [];
            angular.forEach($scope.mailsData, function(item){
                if (inArray(item.name, arr) === -1) {
                    arr.push(item.name);
                    names.push({
                        'id': item.name,
                        'title': item.name
                    });
                }
            });
            def.resolve(names);
            return def;
        };

        $scope.checkboxes = { 'checked': false, items: {} };

        // watch for check all checkbox
        $scope.$watch('checkboxes.checked', function(value) {
            angular.forEach($scope.mailsData, function(item) {
                if (angular.isDefined(item.mid)) {
                    $scope.checkboxes.items[item.mid] = value;
                }
            });
        });

        // watch for data checkboxes
        $scope.$watch('checkboxes.items', function(values) {
            if (!$scope.mailsData) {
                return;
            }
            var checked = 0, unchecked = 0,
                total = $scope.totalMails;
            angular.forEach($scope.mailsData, function(item) {
                checked   +=  ($scope.checkboxes.items[item.mid]) || 0;
                unchecked += (!$scope.checkboxes.items[item.mid]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            // grayed checkbox
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);

    };

};