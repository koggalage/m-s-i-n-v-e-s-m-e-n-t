(function(){
    'use strict'

    angular
    .module('app')
    .controller('TopPannelController', TopPannelController);

    TopPannelController.$inject = ['$scope', 'ContractsService', '$location'];

    function TopPannelController($scope, ContractsService, $location){

        $scope.searchString = '';

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

    };

})();