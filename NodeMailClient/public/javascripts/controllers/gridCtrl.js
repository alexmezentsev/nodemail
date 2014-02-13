'use strict';
var gridCtrl = function($scope, $rootScope, $http, $route, $filter, $q, ngTableParams){

    var url = '/api/getAllMails/'+$rootScope.folder;
    console.log(url);
    $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
            var socket = io.connect('http://localhost');
            socket.on('mails' , function (newData) {
                $scope.$apply(function(){
                    $scope.mailsData = newData.items;
                    $scope.totalMails = newData.total;
                    $rootScope.inboxCount = newData.total;
                });
                $scope.tableParams.reload();
            });
            $scope.mailsData = data.items;
            $scope.totalMails = data.total;
            if($rootScope.folder === 1){
                socket.emit('sentCount', data.total);
                $rootScope.sentCount = data.total;
            }
            if($rootScope.folder === 2){
                socket.emit('trashCount', data.total);
                $rootScope.trashCount = data.total;
            }
            $scope.buildTable();
        }).
        error(function(data, status, headers, config) {

        });


    $scope.buildTable = function(){
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: function () { return $scope.totalMails }, // length of data
            getData: function($defer, params) {
                var data = $scope.mailsData;
                var total = $scope.totalMails;
//                  var orderedData = params.sorting() ?
//                      $filter('orderBy')($scope.mailsData, params.orderBy()) :
//                      $scope.mailsData;
//                  orderedData = params.filter() ?
//                      $filter('filter')(orderedData, params.filter()) :
//                      orderedData;

                params.total(total); // set total for recalc pagination
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

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
            //grayed checkbox
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);
    };
};