(function(){
    'use strict'

    angular
    .module('app')
    .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', 'CustomerService'];
    function CustomersController($scope, CustomerService){
       
        var vm = {};

        // $('.datepicker').datepicker({
        //     startDate: '-3d'
        // });

        function getCustomerExtender(){
            var obj = { customer : {} };

            obj._createCustomer = function(){
                CreateCustomer(obj.customer);
            }

            return obj;
        }

        function CreateCustomer(customer){
            CustomerService.createCustomer(customer).then(function(result){
                
            }, function(error){

            });
        }

        function onLoad(){
            vm = $scope;
            vm.customers = angular.extend(vm.customers || {}, getCustomerExtender());
        }

        onLoad();
    }

})();