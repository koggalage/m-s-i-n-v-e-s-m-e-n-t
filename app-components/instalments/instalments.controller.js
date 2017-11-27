(function () {
    'use strict'

    angular
        .module('app')
        .controller('InstalmentController', InstalmentController);

    InstalmentController.$inject = ['$scope', 'InstalmentService', 'ContractsService', 'CustomerService'];

    function InstalmentController($scope, InstalmentService, ContractsService, CustomerService) {
        var vm = {};

        $(function () {
            $("#instalmentCreatedOn").datepicker();
            $("#instalmentDueDate").datepicker();
        });

        function loadCustomers() {

            ContractsService.getCustomersForOpenContracts().then(function (result) {
                console.log("result", result);
                $scope.contractCustomerList = result;

                var customerNICs = [];

                result.data.forEach(function (elm) {
                    customerNICs.push(elm.nic);
                });

                $scope.customerNICs = customerNICs;

            }, function () {
                toastr.error('Failed Loading Customers!', { timeOut: 3000 });
            });
        };

        function GetCustomerExistency(customerNIC) {
            CustomerService.getCustomerExistency(customerNIC).then(function (result) {
                $scope.customerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showCustomerNotExistWarning = true;
                    vm.instalments.instalment.CustomerId = null;
                } else {
                    $scope.showCustomerNotExistWarning = false;
                    vm.instalments.instalment.CustomerId = result.data.id;
                    GetVehicleNoByCustomerId(result.data.id);
                }
            }, function () {
                toastr.error('Failed Loading Customer Broker Existency!', { timeOut: 3000 });
            });
        };

        function GetVehicleNoByCustomerId(customerId) {
            ContractsService.getVehicleNoByCustomerId(customerId).then(function (result) {
                $scope.vehicleNumbersOfOpenContracts = result.data;
            }, function () {
                toastr.error('Failed Loading Vehicle Numbers for Customer!', { timeOut: 3000 });
            });
        };

        $scope.$watch('nicCustomer', function(newValues, oldValue) {
            if(newValues != oldValue) {
                GetCustomerExistency(newValues);
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


        function GetCurrentInstalmentDetails(contractId, paidDate)
        {
            InstalmentService.getCurrentInstalmentDetails(contractId, paidDate).then(function(result){
                if(result.data){
                    vm.instalments.instalment.DueDate = result.data.dueDate;
                }
            })
        }


        $scope.OnContractChange = function(contractId){
            GetCurrentInstalmentDetails(contractId);
        }
        
        $scope.OnPaidDateChange = function(contractId, paidDate){
            GetCurrentInstalmentDetails(contractId, paidDate)
        }

        function CreateInstalment(installment) {
            InstalmentService.createInstalment(installment).then(function (result) {
                if (result.data == true) {
                    toastr.success('Installment saved successfully', { timeOut: 3000 });
                }
            }, function (error) {
                toastr.error('Failed saving instalment', { timeOut: 3000 });
            })
        }

        function getInstalmentsExtender() {
            var obj = { instalment: {} };

            obj._createInstalment = function () {
                CreateInstalment(obj.instalment);
            }

            return obj;
        }

        function onLoad() {
            vm = $scope;
            vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsExtender());

            loadCustomers();

        }

        onLoad();
    }

})();