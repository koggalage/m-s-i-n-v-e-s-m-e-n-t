(function(){
    'use strict'

    angular
    .module('app')
    .controller('AddNewBrokerController',AddNewBrokerController);

    AddNewBrokerController.$inject = ['$scope', 'AddNewBrokerService']

    function AddNewBrokerController($scope, AddNewBrokerService){
        
        var vm = {};

        function getBrokerExtender(){
            var obj = { broker : {} };

            obj._createBroker = function(){
                CreateBroker(obj.broker);
            };

            return obj;
        }

        function CreateBroker(){
            AddNewBrokerService.createBroker(broker).then(function(result){

            }, function(error){

            });
        }

        function onLoad(){
            vm = $scope;
            vm.brokers = angular.extend(vm.brokers || {}, getBrokerExtender());
        }

        onLoad();
    }

})();