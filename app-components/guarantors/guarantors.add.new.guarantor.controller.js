(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddNewGuarantorController', AddNewGuarantorController);

    AddNewGuarantorController.$inject = ['$scope', 'AddNewGuarantorService']

    function AddNewGuarantorController($scope, AddNewGuarantorService) {

        var vm = {};

        $scope.isGuarantorExist = false;

        function getGuarantorExtender() {
            var obj = { guarantor: {} };

            obj._createGuarantor = function () {
                CreateGuarantor(obj.guarantor);
            };

            obj._getGuarantorExistency = function(){
                GetGuarantorExistency(obj.guarantor.NIC);
            }

            return obj;
        }

        function CreateGuarantor(guarantor) {
            AddNewGuarantorService.createGuarantor(guarantor).then(function (result) {
                if (result.data == true) {
                    toastr.success('Guarantor created successfully', { timeOut: 3000 });
                }
            }, function (error) {
                toastr.error('Failed creating Guarantor', { timeOut: 3000 });
            });
        }

        function GetGuarantorExistency(guarantorNIC) {
            AddNewGuarantorService.getGuarantorExistency(guarantorNIC).then(function (result) {
                if (result.data == null) {
                    $scope.isGuarantorExist = false;
                } else {
                    $scope.isGuarantorExist = true;
                }
                console.log("$scope.isGuarantorExist", $scope.isGuarantorExist);
            }, function () {
                toastr.error('Failed Loading Guarantor Existency!', { timeOut: 3000 });
            });
        };

        $scope.$watch('guarantors.guarantor.NIC', function(newValues, oldValue) {
            if(newValues != oldValue) {
                vm.guarantors._getGuarantorExistency();
            }
          });

        function onLoad() {
            vm = $scope;
            vm.guarantors = angular.extend(vm.guarantors || {}, getGuarantorExtender());
        }

        onLoad();
    }

})();