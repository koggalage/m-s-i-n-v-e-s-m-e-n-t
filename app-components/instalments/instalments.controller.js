(function(){
    'use strict'

    angular
    .module('app')
    .controller('InstalmentController', InstalmentController);

    InstalmentController.$inject = ['$scope', 'InstalmentService'];

    function InstalmentController($scope, InstalmentService)
    {
        var vm = {};

        $( function() {
            $( "#instalmentCreatedOn" ).datepicker();
            $( "#instalmentDueDate" ).datepicker();
        });

        function getInstalmentsExtender() {
            var obj = { instalment: {} };

            obj._createInstalment = function(){
                CreateInstalment(obj.instalment);
            }

            return obj;
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

        function onLoad() {
            vm = $scope;
            vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsExtender());

        }

        onLoad();        
    }

})();