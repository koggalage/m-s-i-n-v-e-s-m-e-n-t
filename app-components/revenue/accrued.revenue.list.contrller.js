(function(){
    'use strict'

    angular
    .module('app')
    .controller('AccruedRevenueListController', AccruedRevenueListController);

    AccruedRevenueListController.$inject = ['$scope','$timeout', 'InstalmentService'];

    function AccruedRevenueListController($scope, $timeout, InstalmentService){
        
        var vm = {};

        function getAccruedRevenueReportExtender(){
            var obj = {};

            obj._loadAccruedRevenueReport =  function(){
                loadAccruedRevenueReport();
            };

            return obj;
        }

        function loadAccruedRevenueReport(){
            InstalmentService.getAccruedRevenueReport(vm.accruedRevenueReport.fromDate, vm.accruedRevenueReport.toDate).then(function(result){
                vm.accruedRevenueReport.revenueData = result.data;
            })
        }

        function onLoad(){

            vm = $scope;

            $(function () {
                $("#dpFrom").datepicker({ 
                      setDate: new Date(),
                      autoclose: true, 
                      todayHighlight: true
                }).datepicker('update', new Date());    

                $("#dpTo").datepicker({ 
                    setDate: new Date(),
                    autoclose: true, 
                    todayHighlight: true
              }).datepicker('update', new Date());                 
            });  

            vm.accruedRevenueReport = angular.extend(vm.accruedRevenueReport || {},  getAccruedRevenueReportExtender())

            $timeout(function() {
                vm.accruedRevenueReport._loadAccruedRevenueReport();
             }, 3000); 

        }

        onLoad();

    }

})();