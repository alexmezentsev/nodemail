'use strict';

// Declare app level module which depends on filters, and services
angular.module('App', ['ngRoute', 'App.directives', 'ui.bootstrap', 'ngTable']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/inbox', {
                templateUrl: 'partials/inbox',
                controller: inboxCtrl
            }).
            when('/new', {
                templateUrl: 'partials/newMessage',
                controller: inboxCtrl
            }).
            otherwise({
                redirectTo: '/inbox'
            });
        $locationProvider.html5Mode(true);
    }]);
