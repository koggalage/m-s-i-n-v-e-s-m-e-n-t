(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractClosedListController', ContractClosedListController);

    ContractClosedListController.$inject = ['$scope', 'ContractsService'];
    function ContractClosedListController($scope, ContractsService){
       
        var vm = {};

        function getContractsExtender(){
    
            var obj = {};

            obj._loadClosedContracts = function(){
                loadClosedContracts();
            };

            return obj;
        }

        function loadClosedContracts(){
            ContractsService.getClosedContracts().then(function(result){
                vm.contracts.closedContractData = result.data;
            });
        }

        function onLoad(){
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractsExtender());
        
            vm.contracts._loadClosedContracts();
        }

        onLoad();
    }

})();