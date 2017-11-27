(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractCloseController', ContractCloseController);

    ContractCloseController.$inject = ['$scope', 'InstalmentService'];

    function ContractCloseController($scope, InstalmentService){

        var vm = {};

        function closingContractExtender(){
            var obj = {};

            obj._loadContractsToBeClosed = function(){
                loadContractsToBeClosed();
            }

            obj._openContractCloseDialog = function(){
                openContractCloseDialog();
            }

            return obj;
        }

        function loadContractsToBeClosed(){
            InstalmentService.getContractsToBeClosed().then(function(result){
                vm.closingContracts.contractData = result.data;
            });
        }

        function openContractCloseDialog(){
            ngDialog.open({
                template: '/app-components/contracts/contracts.close.list.view.html',
                scope: $scope
            });
        }

        function onLoad(){
            vm = $scope;
            vm.closingContracts = angular.extend(vm.closingContracts || {},closingContractExtender());
            vm.closingContracts._loadContractsToBeClosed();
        }

        onLoad();
    }

})();