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
                vm.instalments = result.data;
            }, function(error){

            });
        }


        function onLoad() {
            vm = $scope;
            vm.params = vm.params || {};
            vm.params.contractId = ($stateParams.contractId) ? $stateParams.contractId : '';

            vm.contractId = vm.params.contractId;

            GetInstallmentsForContract(vm.contractId);

            //vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsExtender());
        }

        onLoad();
    }

})();