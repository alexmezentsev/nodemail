'use strict';
var gridCtrl = function($scope, $http, searchingParameter, $route){

    $http({method: 'GET', url: '/api/getAllMails'}).
        success(function(data, status, headers, config) {
            $scope.mailsData = data;
        }).
        error(function(data, status, headers, config) {

        });
//    $scope.myData
//    $scope.gridOptions = {
//        data: 'mailsData',
//        enablePaging: true,
//        enableRowSelection: false,
//        showFooter: true,
//        totalServerItems:'totalServerItems',
//        pagingOptions: $scope.pagingOptions,
//        columnDefs: [
//            {field: 'action', displayName: "Action", width: '65',  sortable: false, cellTemplate:'<actioncheckbox/>'},
//            { field: 'starred', displayName: "Marked", width: '65',  sortable: true, cellTemplate:'<markedcheckbox/>'},
//            { field: 'assay_id', displayName: "Accession", width: '*',  sortable: true },
//            { field: 'patient_first_name', displayName: "Last/First", width: '*', sortable: true },
//            { field: 'diagnosis', displayName: "Diagnosis", width: '*', sortable: true },
//            { field: 'physician_last_name', displayName: "Ordering Physician", width: '*', sortable: true },
//            { field: 'ordered_on', displayName: "Ordering Date", width: '*', sortable: true },
//            { field: 'results_on', displayName: "Response Date", width: '*', sortable: true }]
//    };
};