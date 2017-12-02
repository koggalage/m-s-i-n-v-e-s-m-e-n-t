(function () {
    'use strict'

    angular
        .module('app')
        .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$scope', 'ngDialog', 'ContractsService', 'AddNewBrokerService', 'CustomerService'];
    function ContractsController($scope, ngDialog, ContractsService, AddNewBrokerService, CustomerService) {

        var vm = {};
        $scope.showBrokerNotExistWarning = false;
        $scope.showCustomerNotExistWarning = false;

        $scope.isNoOfInstallmentsDisabled = true;


        // function OpenBrokerPopup() {
        //     ngDialog.open({
        //         template: '/app-components/brokers/brokers.add.new.broker.view.html',
        //         controller: 'AddNewBrokerController',
        //         scope: $scope,
        //         closeByDocument: true,
        //         data: {}
        //     })
        // }

        function CreateContract(contract) {
            contract.GuarantorId = "1";
            //contract.BrokerId = null;
            console.log("contract", contract);
            ContractsService.createContract(contract).then(function (result) {
            console.log("result", result);
            
                toastr.success('New Contract Created Successfully!', { timeOut: 3000 });
            }, function (error) {
                toastr.error(error.data.exceptionMessage, { timeOut: 3000 });
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
                toastr.error('Failed Loading Customers!', { timeOut: 3000 });
            });
        };

        function loadBrokers() {

            ContractsService.getBrokerDetails().then(function (result) {
                $scope.contractBrokerList = result;

                var brokerNICs = [];

                result.data.brokerDetails.forEach(function (elm) {
                    brokerNICs.push(elm.nic);
                });

                $scope.brokerNICs = brokerNICs;

            }, function () {
                toastr.error('Failed Loading Brokers!', { timeOut: 3000 });
            });
        };

        function GetCustomerExistency(customerNIC) {
            CustomerService.getCustomerExistency(customerNIC).then(function (result) {
                $scope.customerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showCustomerNotExistWarning = true;
                    vm.contracts.contract.CustomerId = null;
                } else {
                    $scope.showCustomerNotExistWarning = false;
                    vm.contracts.contract.CustomerId =result.data.id;
                }
                console.log("$scope.showBrokerNotExistWarning", $scope.showBrokerNotExistWarning);
            }, function () {
                toastr.error('Failed Loading Customer Existency!', { timeOut: 3000 });
            });
        };

        function GetBrokerExistency(brokerNIC) {
            AddNewBrokerService.getBrokerExistency(brokerNIC).then(function (result) {
                $scope.brokerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showBrokerNotExistWarning = true;
                    vm.contracts.contract.BrokerId = null;
                } else {
                    $scope.showBrokerNotExistWarning = false;
                    vm.contracts.contract.BrokerId = result.data.id;
                }
                console.log("$scope.showBrokerNotExistWarning", $scope.showBrokerNotExistWarning);
            }, function () {
                toastr.error('Failed Loading Broker Existency!', { timeOut: 3000 });
            });
        };

        function GetMonthlyInstallment(contract) {
            ContractsService.getMonthlyInstallment(contract).then(function (result) {
                console.log("result getMonthlyInstallment", result);
                vm.contracts.contract.Insallment = result.data;
            }, function (error) {
                toastr.error('Failed to get Monthly Installment!', { timeOut: 3000 });
            });
          }

        $scope.$watch('nicCustomer', function(newValues, oldValue) {
            if(newValues != oldValue) {
                GetCustomerExistency(newValues);
            }
          });

          $scope.$watch('nicBroker', function(newValues, oldValue) {
            if(newValues != oldValue) {
                GetBrokerExistency(newValues);
            }
          });
          

        $scope.completeCustomerNICs = function (string) {
            GetCustomerExistency(string);
            $scope.hideCustomerNICs = false;
            var output = [];
            angular.forEach($scope.customerNICs, function (nic) {
                if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(nic);
                }
            });
            $scope.filterNICsCustomer = output;
        };

        $scope.fillTextboxCustomerNICs = function (string) {
            $scope.nicCustomer = string;
            $scope.hideCustomerNICs = true;
        };

        $scope.completeBrokerNICs = function (string) {
            GetBrokerExistency(string);
            $scope.hideBrokerNICs = false;
            var output = [];
            angular.forEach($scope.brokerNICs, function (nic) {
                if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(nic);
                }
            });
            $scope.filterNICsBroker = output;
            
        };

        $scope.fillTextboxBrokerNICs = function (string) {
            $scope.nicBroker = string;
            $scope.hideBrokerNICs = true;
        };

        $scope.hideList = function () {
            $scope.hideCustomerNICs = true;
            $scope.hideBrokerNICs = true;
            //$scope.country = '';
        };

        $scope.$watch('contracts.contract.Amount', function(newValues, oldValue) {
            if(newValues == null || newValues == undefined || newValues == "") {
                $scope.isNoOfInstallmentsDisabled = true;
            } else {
                $scope.isNoOfInstallmentsDisabled = false;
            }
          });

          $scope.onCreateBrokerClick = function () {
            ngDialog.open({
                template: 'app-components/brokers/brokers.add.new.broker.view.html',
                controller: 'AddNewBrokerController'
            });
          };

          $scope.onCreateGuarantorClick = function () {
            ngDialog.open({
                template: 'app-components/guarantors/guarantors.add.new.guarantor.view.html',
                controller: 'AddNewGuarantorController'
            });
          };

          

        function getContractExtender() {
            var obj = { contract: {} };

            obj._createContract = function () {
                CreateContract(obj.contract);
            };

            obj._getMonthlyInstallment = function () {
                GetMonthlyInstallment(obj.contract);
            };

            //obj._addNewBrokerTemplate = '/app-components/brokers/brokers.add.new.broker.view.html';

            obj._openBrokerPopup = function () {
                OpenBrokerPopup();
            };

            obj._GetBrokerExistency = function () {
                GetBrokerExistency(obj.contract.nic);
            };

            return obj;
        }

        function onLoad() {
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractExtender());

            $scope.tags = [
                { text: 'Tag1' },
                { text: 'Tag2' },
                { text: 'Tag3' }
              ];

            loadCustomers();
            loadBrokers();
        }

        onLoad();
    }

})();