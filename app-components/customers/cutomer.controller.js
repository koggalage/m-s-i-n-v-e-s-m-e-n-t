(function () {
    'use strict'

    angular
        .module('app')
        .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', 'CustomerService'];
    function CustomersController($scope, CustomerService) {

        var vm = {};

        $scope.isCustomerExist = false;

        $(function () {
            $("#createdOn").datepicker();
        });

        function getCustomerExtender() {
            var obj = { customer: {} };

            obj._createCustomer = function () {
                CreateCustomer(obj.customer);
            }

            obj._getCustomerExistency = function () {
                GetCustomerExistency(obj.customer.NIC);
            }

            return obj;
        }

        function CreateCustomer(customer) {
            CustomerService.createCustomer(customer).then(function (result) {
                if (result.data == true) {
                    toastr.success('Customer created successfully', { timeOut: 3000 });
                }
            }, function (error) {
                toastr.error('Failed creating customer', { timeOut: 3000 });
            });
        }

        function GetCustomerExistency(customerNIC) {
            if (customerNIC == null || customerNIC == "" || customerNIC == undefined) {
                toastr.error('Please enter a valid NIC Number!', { timeOut: 3000 });
            } else {
                CustomerService.getCustomerExistency(customerNIC).then(function (result) {
                    if (result.data == null) {
                        $scope.isCustomerExist = false;
                    } else {
                        $scope.isCustomerExist = true;
                    }
                    console.log("$scope.isCustomerExist", $scope.isCustomerExist);
                }, function () {
                    toastr.error('Failed Loading Customer Broker Existency!', { timeOut: 3000 });
                });
            }
        };

        $scope.$watch('customers.customer.NIC', function (newValues, oldValue) {
            if (newValues != oldValue) {
                vm.customers._getCustomerExistency();
            }
        });

        function onLoad() {
            vm = $scope;
            vm.customers = angular.extend(vm.customers || {}, getCustomerExtender());
        }

        onLoad();
    }

})();