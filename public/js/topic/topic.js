(function() {
    'use strict';

    angular
    .module('app')
    .controller('TopicController', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        alert("tulid lehele id'ga " +  $routeParams.id);
        //controller logic goes here

    }]);
}());
