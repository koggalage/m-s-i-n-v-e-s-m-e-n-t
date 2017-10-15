(function(){
    'use strict'

    angular
    .module('app')
    .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', 'CustomerService'];
    function CustomersController($scope, CustomerService){
       
        var vm = {};

        $( function() {
            $( "#createdOn" ).datepicker();
        });

        function getCustomerExtender(){
            var obj = { customer : {} };

            obj._createCustomer = function(){
                CreateCustomer(obj.customer);
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

        function onLoad(){
            vm = $scope;
            vm.customers = angular.extend(vm.customers || {}, getCustomerExtender());
        }

        onLoad();
    }

})();