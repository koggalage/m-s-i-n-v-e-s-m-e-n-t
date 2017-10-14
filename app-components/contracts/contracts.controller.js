(function () {
    'use strict'

    angular
        .module('app')
        .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$scope', 'ngDialog', 'ContractsService'];
    function ContractsController($scope, ngDialog, ContractsService) {

        var vm = {};

        function getContractExtender() {
            var obj = { contract: {} };

            obj._createContract = function () {
                CreateContract(obj.contract);
            };

            //obj._addNewBrokerTemplate = '/app-components/brokers/brokers.add.new.broker.view.html';

            obj._openBrokerPopup = function () {
                OpenBrokerPopup();
            };

            return obj;
        }

        function OpenBrokerPopup() {
            ngDialog.open({
                template: '/app-components/brokers/brokers.add.new.broker.view.html',
                controller: 'AddNewBrokerController',
                scope: $scope,
                closeByDocument: true,
                data: {}
            })
        }

        function CreateContract(contract) {
            ContractsService.createContract(contract).then(function (result) {

            }, function (error) {

            })
        }

        function loadCustomers() {

            ContractsService.getCustomerDetails().then(function (result) {
                $scope.contractCustomerList = result;

                var customerNICs = [];

                result.data.customerDetails.forEach(function (elm) {
                    customerNICs.push(elm.nic);
                });

                $scope.customerNICs = customerNICs;

            }, function () {
                customers._isLoading = false;
            });
        }

        $scope.complete = function (string) {
            $scope.hidethis = false;
            var output = [];
            angular.forEach($scope.customerNICs, function (nic) {
                if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(nic);
                }
            });
            $scope.filterCountry = output;
        }

        $scope.fillTextbox = function (string) {
            $scope.country = string;
            $scope.hidethis = true;
        }

        function onLoad() {
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractExtender());

            loadCustomers();
        }

        onLoad();
    }

})();