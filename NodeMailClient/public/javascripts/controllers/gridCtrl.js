'use strict';
var gridCtrl = function($scope, $http, searchingParameter, $route){

    var parseData = function(data){

        console.log(data[0]);
        console.log(data[0].mheaders);
        console.log(typeof data[0].mheaders);
        console.log(JSON.parse(data[0].mheaders));


        $scope.mailDate = data.mheaders.date;
        $scope.mailFrom = data.mheaders.from;
        $scope.mailTo = data.mheaders.to[0];
        $scope.mailSubject = data.mheaders.subject[0];

    };

    $http({method: 'GET', url: '/api/getAllMails'}).
        success(function(data, status, headers, config) {
            parseData(data)
        }).
        error(function(data, status, headers, config) {

        });
//    $scope.myData
//    $scope.gridOptions = {
//        data: 'myData',
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