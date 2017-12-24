(function () {
    'use strict'

    angular
        .module('app')
        .controller('InstalmentDetailController', InstalmentDetailController);

    InstalmentDetailController.$inject = ['$scope', 'InstalmentService', '$stateParams', 'Lightbox'];

    function InstalmentDetailController($scope, InstalmentService, $stateParams, Lightbox) {
        var vm = {};
        $scope.images = [];

        function GetInstallmentsForContract(contractId) {
            InstalmentService.getInstallmentsForContract(contractId).then(function (result) {
                vm.contract = result.data;
            }, function (error) {

            });
        }

        function GetContractDetails(contractId) {
            InstalmentService.GetContractDetails(contractId).then(function (result) {
                vm.contract = result.data;
            }, function (error) {

            });
        };

        function GetContractDocuments(contractId) {
            InstalmentService.GetContractDocuments(contractId).then(function (result) {
                console.log("Images Result", result);
                $scope.images = result.data.files;
            }, function (error) {

            });
        };

        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.images, index);
        };

        function onLoad() {
            vm = $scope;
            vm.params = vm.params || {};
            vm.params.contractId = ($stateParams.contractId) ? $stateParams.contractId : '';

            vm.contractId = vm.params.contractId;

            GetContractDetails(vm.contractId);

            GetContractDocuments(vm.contractId);
        }

        onLoad();
    }

})();