(function(){
    'use strict'

    angular
    .module('app')
    .controller('InstalmentController', InstalmentController);

    InstalmentController.$inject = ['$scope', 'InstalmentService'];

    function InstalmentController($scope, InstalmentService)
    {
        var vm = {};

        function getInstalmentsExtender() {
            var obj = { instalment: {} };

            obj._createInstalment = function(){
                CreateInstalment(obj.instalment);
            }

            return obj;
        }


        function CreateInstalment(installment) {
            InstalmentService.createInstalment(installment).then(function (result) {

            }, function (error) {

            })
        }

        function onLoad() {
            vm = $scope;
            vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsExtender());

        }

        onLoad();        
    }

})();