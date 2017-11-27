(function(){
    'use strict'

    angular
        .module('app')
        .controller('RevenueListController', RevenueListController);

    RevenueListController.$inject = ['$scope','$timeout', 'InstalmentService'];

    function RevenueListController($scope, $timeout, InstalmentService){

        var vm = {};

        function getRevenueReportExtender(){
            
            var obj = {};

            obj._loadRevenueReport = function(){
                loadRevenueReport();
            };

            return obj;
        }

        function loadRevenueReport(){
            InstalmentService.getRevenueReport(vm.revenueReport.fromDate, vm.revenueReport.toDate).then(function(result){
                vm.revenueReport.revenueData = result.data;    
            })
        }

        // function loadAccruedRevenueReport(){
        //     InstalmentService.getAccruedRevenueReport(vm.revenueAccruedReport.fromDate, vm.revenueAccruedReport.toDate).then(function(result){
        //         vm.revenueAccruedReport.revenueData = result.data;
        //     })
        // }

        // function getAccruedRevenueReportExtender(){
        //     var obj = {};

        //     obj._loadAccruedRevenueReport =  function(){
        //         loadAccruedRevenueReport();
        //     };

        //     return obj;
        // }

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

            vm.revenueReport = angular.extend(vm.revenueReport || {}, getRevenueReportExtender());

            $timeout(function() {
                vm.revenueReport._loadRevenueReport();
             }, 3000); 
        }

        onLoad();
    }

})();