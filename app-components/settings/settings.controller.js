(function(){
    'use strict'

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

        SettingsController.$inject = ['$scope', 'ngDialog', 'SettingsService'];

        function SettingsController($scope, ngDialog, SettingsService){

            var vm = {};

            var RATE_TYPES = {
                INTEREST_RATE : 1,
                LATE_FEE_RATE : 2,
                DOCUMENT_CHARGE_RATE : 3
            };

            var DOCUMENT_CHARGE = 5;

            
            function getInterestRateExtender() {
                var obj = { interest: {} };

                obj._openAddNewInterestDialog = function () {
                    openAddNewInterestDialog();
                }

                obj._addNewInterestRate = function(){
                    addNewInterestRate();
                }

                obj._rateOptions = [
                    {"type":"1" , "description" : "Interest For Less Than Six Months"},
                    {"type":"2" , "description" : "Interest For Greater Than Six Months"}
                ];

                obj._load = function(){
                    getAllInterestRates();
                }

                return obj;
            }

            function getLateFeeRateExtender() {
                var obj = { latefee: {} };

                obj._openAddNewLateFeeDialog = function () {
                    openAddNewLateFeeDialog();
                }

                obj._addNewLateFeeRate = function(){
                    addNewLateFeeRate();
                }

                obj._rateOptions = [
                    {"type":"3" , "description" : "Fine For Greater Than Seven Days"},
                    {"type":"4" , "description" : "Fine For Greater Thirty Days"}
                ];

                obj._load = function(){
                    getAllLateFeeRates();
                }

                return obj;
            }

            function getDocChargeRateExtender() {
                var obj = { docCharge: {} };

                obj._openAddNewDocumentChargeDialog = function () {
                    openAddNewDocumentChargeDialog();
                }

                obj._addNewDocChargeRate = function(){
                    addNewDocumentChargeRate();
                }

                obj._load = function(){
                    getAllDocChargeRates();
                }

                return obj;
            }
            
            function getAllInterestRates(){
                SettingsService.getAllInterestRates(RATE_TYPES.INTEREST_RATE).then(function(result){
                    vm.interest.records = result.data;
                })
            }

            function getAllLateFeeRates(){
                SettingsService.getAllInterestRates(RATE_TYPES.LATE_FEE_RATE).then(function(result){
                    vm.latefee.records = result.data;
                })
            }

            function getAllDocChargeRates(){
                SettingsService.getAllInterestRates(RATE_TYPES.DOCUMENT_CHARGE_RATE).then(function(result){
                    vm.docCharge.records = result.data;
                })
            }

            function openAddNewInterestDialog(){
                ngDialog.open({
                    template: 'app-components/settings/settings.add.interest.rate.view.html',
                    scope: $scope
                });
            }

            function openAddNewLateFeeDialog(){
                ngDialog.open({
                    template: 'app-components/settings/settings.add.latefee.rate.view.html',
                    scope: $scope
                });
            }

            function openAddNewDocumentChargeDialog(){
                ngDialog.open({
                    template: 'app-components/settings/settings.add.docCharge.view.html',
                    scope: $scope
                });
            }

            function addNewInterestRate(){
                SettingsService.createInterestRate({ Value : vm.interest.rate, Type : vm.interest.type.type}).then(function (result) {
                    if (result.data) {
                        var message = result.data;
                        toastr.success(message, { timeOut: 3000 });
                        ngDialog.close();
                        vm.interest._load();
                    }
                }, function (error) {
                    toastr.error('Failed updating rate', { timeOut: 3000 });
                    ngDialog.close();
                })
            }

            function addNewLateFeeRate(){
                SettingsService.createInterestRate({ Value : vm.latefee.rate, Type : vm.latefee.type.type}).then(function (result) {
                    if (result.data) {
                        var message = result.data;
                        toastr.success(message, { timeOut: 3000 });
                        ngDialog.close();
                        vm.latefee._load();
                    }
                }, function (error) {
                    toastr.error('Failed updating rate', { timeOut: 3000 });
                    ngDialog.close();
                })
            }

            function addNewDocumentChargeRate(){
                SettingsService.createInterestRate({ Value : vm.docCharge.rate, Type : DOCUMENT_CHARGE}).then(function (result) {
                    if (result.data) {
                        var message = result.data;
                        toastr.success(message, { timeOut: 3000 });
                        ngDialog.close();
                        vm.docCharge._load();
                    }
                }, function (error) {
                    toastr.error('Failed updating rate', { timeOut: 3000 });
                    ngDialog.close();
                })
            }

            function onLoad(){
                debugger;
                vm = $scope;

                vm.interest = angular.extend(vm.interest || {}, getInterestRateExtender());
                vm.latefee = angular.extend(vm.latefee || {}, getLateFeeRateExtender());
                vm.docCharge = angular.extend(vm.docCharge || {}, getDocChargeRateExtender());

                vm.interest._load();
                vm.latefee._load();
                vm.docCharge._load();
            }

            onLoad();
        }

})();