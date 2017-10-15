(function(){
    'use strict'

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', 'ContractsService'];

    function AppController($scope, ContractsService){
        
        $scope.getCustomerContracts = function(){
            ContractsService.getContract($scope.searchString).then(function(result){
                $scope.contractsDetails = [{ Id : '1234', Name : 'Qwerty', Amount : '2345' }]
                //if(!result.data)
                //{
                   // $location.path('/sessions/new');
                //}
            },function(error){

            });
        }
    }

})();