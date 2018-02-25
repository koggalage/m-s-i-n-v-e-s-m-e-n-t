(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddNewBrokerController', AddNewBrokerController);

    AddNewBrokerController.$inject = ['$scope', 'AddNewBrokerService', 'ngDialog']

    function AddNewBrokerController($scope, AddNewBrokerService, ngDialog) {

        var vm = {};
        
        $scope.isBrokerExist = false;

        function getBrokerExtender() {
            var obj = { broker: {} };

            obj._createBroker = function () {
                CreateBroker(obj.broker);
            };

            obj._getBrokerExistency = function(){
                GetBrokerExistency(obj.broker.NIC);
            }

            return obj;
        }

        function CreateBroker(broker) {
            AddNewBrokerService.createBroker(broker).then(function (result) {
                if (result.data == true) {
                    toastr.success('Broker created successfully', { timeOut: 3000 });
                    ngDialog.close();
                }
            }, function (error) {
                toastr.error('Failed creating Broker', { timeOut: 3000 });
                ngDialog.close();
            });
        }

        function GetBrokerExistency(brokerNIC) {
            AddNewBrokerService.getBrokerExistency(brokerNIC).then(function (result) {
                if (result.data == null) {
                    $scope.isBrokerExist = false;
                } else {
                    $scope.isBrokerExist = true;
                }
                console.log("$scope.isBrokerExist", $scope.isBrokerExist);
            }, function () {
                toastr.error('Failed Loading Broker Existency!', { timeOut: 3000 });
            });
        };

        $scope.$watch('brokers.broker.NIC', function(newValues, oldValue) {
            if(newValues != oldValue) {
                vm.brokers._getBrokerExistency();
            }
          });

        function onLoad() {
            vm = $scope;
            vm.brokers = angular.extend(vm.brokers || {}, getBrokerExtender());
        }

        onLoad();
    }

})();