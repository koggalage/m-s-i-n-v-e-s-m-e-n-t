(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$scope', 'ngDialog', 'ContractsService'];
    function ContractsController($scope, ngDialog ,ContractsService){
        
        var vm = {};

        function getContractExtender()
        {
            var obj = { contract : {} };

            obj._createContract = function(){
                CreateContract(obj.contract);
            };

            //obj._addNewBrokerTemplate = '/app-components/brokers/brokers.add.new.broker.view.html';

            obj._openBrokerPopup = function(){
                OpenBrokerPopup();
            };

            return obj;
        }

        function OpenBrokerPopup(){
            ngDialog.open({
                template: '/app-components/brokers/brokers.add.new.broker.view.html',
                controller: 'AddNewBrokerController',
                scope : $scope,
                closeByDocument: true,
                data: {}
            })
        }

        function CreateContract(contract)
        {
            ContractsService.createContract(contract).then(function(result){

            },function(error){

            })
        }

        function onLoad()
        {
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractExtender());
        }

        onLoad();
    }

})();