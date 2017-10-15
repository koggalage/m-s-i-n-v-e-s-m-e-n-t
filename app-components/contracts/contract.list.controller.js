(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractListController', ContractListController);

    ContractListController.$inject = ['$scope', 'ContractsService'];
    function ContractListController($scope, ContractsService){
       
        var vm = {};

        function getContractsExtender(){
    
            var obj = {};

            obj._loadActiveContracts = function(){
                loadActiveContracts();
            };

            return obj;
        }


        function loadActiveContracts(){
            ContractsService.getActiveContracts().then(function(result){
                vm.contracts.contractData = result.data;
            }, function(error){

            })
        }

        function onLoad(){
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractsExtender());
            vm.contracts._loadActiveContracts();
        }

        onLoad();
    }

})();