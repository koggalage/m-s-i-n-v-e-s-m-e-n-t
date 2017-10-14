(function(){
    'use strict'

    angular
        .module('app')
        .controller('SessionsController', SessionsController)

    SessionsController.$inject = ['$scope', '$location', 'AuthenticationService'];

    function SessionsController($scope, $location, AuthenticationService){
        //debugger;

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function(){
            AuthenticationService.login($scope.loginData).then(function( response){
                $location.path('/app');
            },function(err){
                console.log(err);
            });
        };

    };

})();