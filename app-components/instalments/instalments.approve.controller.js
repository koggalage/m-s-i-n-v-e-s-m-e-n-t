(function(){
    'use strict'

    angular
    .module('app')
    .controller('InstalmentsApproveController', InstalmentsApproveController);

    InstalmentsApproveController.$inject = ['$scope', 'InstalmentService'];

    function InstalmentsApproveController($scope, InstalmentService){
        
        var vm = {};

        function getInstalmentsApproveExtender(){
            
            var obj = {};

            obj._getInstalmentsToBeApproved = function(){
                getInstalmentsToBeApproved();
            };

            obj._approveInstalment = function(instalmentId){
                approveInstalment(instalmentId);
            };

            return obj;
        }

        function getInstalmentsToBeApproved(){
            InstalmentService.getInstalmentsToBeApproved().then(function(result){
                vm.instalments.records = result.data;
            });
        }

        function approveInstalment(instalmentId){
            InstalmentService.approveInstalment(instalmentId).then(function(result){
                if(result.data == true){
                    vm.instalments._getInstalmentsToBeApproved();
                    toastr.success('Approved!', { timeOut: 3000 });
                }
                else{
                    toastr.error('Rejected!', { timeOut: 3000 });
                }
            });
        }

        function onLoad(){
            vm = $scope;
            vm.instalments = angular.extend(vm.instalments || {}, getInstalmentsApproveExtender());
            vm.instalments._getInstalmentsToBeApproved();
        }

        onLoad();
    }

})();