(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractCloseController', ContractCloseController);

    ContractCloseController.$inject = ['$scope', 'InstalmentService', 'ngDialog', '$timeout'];

    function ContractCloseController($scope, InstalmentService, ngDialog, $timeout){

        var vm = {};

        function closingContractExtender(){
            var obj = {};

            obj._loadContractsToBeClosed = function(){
                loadContractsToBeClosed();
            }

            obj._openContractCloseDialog = function(id){
                openContractCloseDialog(id);
            }

            return obj;
        }

        function loadContractsToBeClosed(){
            InstalmentService.getContractsToBeClosed().then(function(result){
                vm.closingContracts.contractData = result.data;
            });
        }

        function openContractCloseDialog(id){

            ngDialog.open({
                template: '/app-components/contracts/contract.close.dialog.view.html',
                scope: $scope,
                data :{
                    contractId : id
                }
            });

            $timeout(function () {
                $("#dpDue").datepicker({ 
                    setDate: new Date(),
                    autoclose: true, 
                    todayHighlight: true
              }).datepicker('update', new Date());              
            }, 1000);
        }

        $scope.GetPaybleAtContractClosingDate = function(contractId, closingDate){
            InstalmentService.getPaybleAtContractClosingDate(contractId, closingDate).then(function(result){
                $scope.totalPayble = result.data;
            });
        }

        $scope.CloseContract = function(contractId, closingDate, settlementAmount){
            InstalmentService.closeContract({ContractId: contractId, SettlementAmount: settlementAmount,ClosedDate: closingDate}).then(function(result){
                if(result.data == true){
                    toastr.success('Contract closed successfully!', { timeOut: 3000 });
                }
                else{
                    toastr.error('Error closing Contract!', { timeOut: 3000 });
                }
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