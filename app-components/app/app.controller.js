(function(){
    'use strict'

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', 'ContractsService', 'InstalmentService'];

    function AppController($scope, ContractsService, InstalmentService){

        var vm = {};

        function getCustomerContracts(){
            ContractsService.getContract(vm.contractsIntalments.searchString).then(function(result){
                vm.contractsIntalments.contractsDetails = result.data;
            },function(error){

            });
        }

        function getContractExtender() {
            var obj = { };

            obj.searchString = '';

            obj._getCustomerContracts = function () {
                getCustomerContracts(obj.searchString);
            };

            return obj;
        }

        function getInstalmentExtender(){
            var obj = {};

            obj._getNumberOfInstalments = function(){
                getNumberOfInstalments();
            };

            obj._getAccruedRevenueForToday = function(){
                getAccruedRevenueForToday();
            };

            obj._getRevenueForToday = function(){
                getRevenueForToday();
            };

            obj._getNumberOfContracts = function(){
                getNumberOfContracts();
            };

            obj._getInstalmentsForToday = function(){
                getInstalmentsForToday();
            };

            return obj;
        }
        
        function getNumberOfInstalments(){
            InstalmentService.GetNumberOfInstalmentsForToday().then(function(result){
                vm.instalments.noOfInstalmentsForToday = result.data;
            });
        }

        function getAccruedRevenueForToday(){
            InstalmentService.GetAccruedRevenueForToday().then(function(result){
                vm.instalments.accruedRevenueForToday = result.data;
            });
        }

        function getRevenueForToday(){
            InstalmentService.GetRevenueForToday().then(function(result){
                vm.instalments.revenueForToday = result.data;
            });
        }

        function getNumberOfContracts(){
            InstalmentService.GetNumberOfContracts().then(function(result){
                vm.instalments.numberOfContracts = result.data;
            });
        }

        function getInstalmentsForToday(){
            InstalmentService.GetInstalmentsForToday().then(function(result){
                vm.instalments.todayInstalments = result.data;
            });
        }

        //GetNumberOfContracts

        function onLoad(){
            vm = $scope;
            vm.contractsIntalments = angular.extend(vm.contractsIntalments || {}, getContractExtender()); 
            vm.instalments = angular.extend(vm.instalments || {}, getInstalmentExtender());  

            vm.instalments._getNumberOfInstalments();
            vm.instalments._getAccruedRevenueForToday();
            vm.instalments._getRevenueForToday();
            vm.instalments._getNumberOfContracts();
            vm.instalments._getInstalmentsForToday();
        }

        onLoad();
    }

})();