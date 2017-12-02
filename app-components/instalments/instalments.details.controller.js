(function(){
    'use strict'

    angular
    .module('app')
    .controller('InstalmentDetailController', InstalmentDetailController);

    InstalmentDetailController.$inject = ['$scope', 'InstalmentService', '$stateParams'];

    function InstalmentDetailController($scope, InstalmentService, $stateParams)
    {
        var vm = {};

        // function getInstalmentsDetailsExtender() {
        //     var obj = { instalmentsData : [] };

        //     obj._getInstallmentsForContract = function(contractId)
        //     {
        //         GetInstallmentsForContract(contractId);
        //     }

        //     return obj;
        // }

        function GetInstallmentsForContract(contractId)
        {
            InstalmentService.getInstallmentsForContract(contractId).then(function(result){
                vm.contract = result.data;
            }, function(error){

            });
        }

        function GetContractDetails(contractId)
        {
            InstalmentService.GetContractDetails(contractId).then(function(result){
                vm.contract = result.data;
            }, function(error){

            });
        };

        function GetCustomerDetails(contractId){

        }

        function onLoad() {
            vm = $scope;
            vm.params = vm.params || {};
            vm.params.contractId = ($stateParams.contractId) ? $stateParams.contractId : '';

            vm.contractId = vm.params.contractId;

            GetContractDetails(vm.contractId);

            //vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsExtender());
        }

        onLoad();
    }

})();