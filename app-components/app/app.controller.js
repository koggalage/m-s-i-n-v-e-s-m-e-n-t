(function(){
    'use strict'

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', 'ContractsService'];

    function AppController($scope, ContractsService){

        var vm = {};

        function getCustomerContracts(){
            ContractsService.getContract(vm.contractsIntalments.searchString).then(function(result){
                vm.contractsIntalments.contractsDetails = result.data;
            },function(error){

            });
        }



        function getContractExtender() {
            var obj = { };

            obj.searchString = '';

            obj._getCustomerContracts = function () {
                getCustomerContracts(obj.searchString);
            };

            return obj;
        }

        function onLoad(){
            vm = $scope;
            vm.contractsIntalments = angular.extend(vm.contractsIntalments || {}, getContractExtender());           
        }

        onLoad();
    }

})();