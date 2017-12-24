(function(){
    'use strict'

    angular
        .module('app')
        .controller('DocumentChargeListController', DocumentChargeListController);

    DocumentChargeListController.$inject = ['$scope', 'ContractsService', '$timeout'];

    function DocumentChargeListController($scope, ContractsService, $timeout){
        
        var vm = {};

        function getDocumentChargeReportExtender(){
            
            var obj = {};

            obj._loadDocumentChargeReport = function(){
                loadDocumentChargeReport();
            };

            return obj;
        }

        function loadDocumentChargeReport(){
            ContractsService.getDocumentChargeReport(vm.documentCharge.fromDate, vm.documentCharge.toDate).then(function(result){
                vm.documentCharge.revenueData = result.data;    
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

            vm.documentCharge = angular.extend(vm.documentCharge || {}, getDocumentChargeReportExtender());

            $timeout(function() {
                vm.documentCharge._loadDocumentChargeReport();
             }, 3000); 
        }

        onLoad();
    }

})();