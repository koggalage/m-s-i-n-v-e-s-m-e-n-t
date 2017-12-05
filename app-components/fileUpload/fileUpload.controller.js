(function () {
    'use strict'

    angular
        .module('app')
        .controller('FileController', FileController);

    FileController.$inject = ['$scope', 'ContractsService', 'CustomerService'];

    function FileController($scope, ContractsService, CustomerService) {
        var vm = {};

        function getFilesExtender() {
            var obj = { file: {} };

            // obj._createFile = function () {
            //     CreateFile(obj.file);
            // }

            return obj;
        }

        function loadCustomers() {

            ContractsService.getCustomersForOpenContracts().then(function (result) {
                console.log("result", result);
                $scope.contractCustomerList = result;

                var customerNICs = [];

                result.data.forEach(function (elm) {
                    customerNICs.push(elm.nic);
                });

                $scope.customerNICs = customerNICs;

            }, function () {
                toastr.error('Failed Loading Customers!', { timeOut: 3000 });
            });
        };

        function GetCustomerExistency(customerNIC) {
            CustomerService.getCustomerExistency(customerNIC).then(function (result) {
                $scope.customerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showCustomerNotExistWarning = true;
                    vm.files.File.CustomerId = null;
                } else {
                    $scope.showCustomerNotExistWarning = false;
                    vm.files.File.CustomerId = result.data.id;
                    GetVehicleNoByCustomerId(result.data.id);
                }
            }, function () {
                toastr.error('Failed Loading Customer Broker Existency!', { timeOut: 3000 });
            });
        };

        function GetVehicleNoByCustomerId(customerId) {
            ContractsService.getVehicleNoByCustomerId(customerId).then(function (result) {
                $scope.vehicleNumbersOfOpenContracts = result.data;
            }, function () {
                toastr.error('Failed Loading Vehicle Numbers for Customer!', { timeOut: 3000 });
            });
        };

        $scope.$watch('nicCustomer', function (newValues, oldValue) {
            if (newValues != oldValue) {
                GetCustomerExistency(newValues);
            }
        });

        $scope.completeCustomerNICs = function (string) {
            GetCustomerExistency(string);
            $scope.hideCustomerNICs = false;
            var output = [];
            angular.forEach($scope.customerNICs, function (nic) {
                if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(nic);
                }
            });
            $scope.filterNICsCustomer = output;
        };

        $scope.fillTextboxCustomerNICs = function (string) {
            $scope.nicCustomer = string;
            $scope.hideCustomerNICs = true;
        };

        //File Upload
        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {

            //FILL FormData WITH FILE DETAILS.
            var contractId = $scope.vehicleNumbersOfOpenContracts.Id;

            // var itemName = $scope.itemName;
            // var itemPrice = $scope.itemPrice;
            // var itemType = $scope.itemType;


            for (var i in $scope.files) {
                data.append("uploadedFile", $scope.files[i]);
            }

            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            objXhr.open("POST", "http://localhost:53438/api/Contract/UplaoadFile?contractId=" + contractId);
            objXhr.send(data);
        }

        // UPDATE PROGRESS BAR.
        function updateProgress(e) {
            if (e.lengthComputable) {
                document.getElementById('pro').setAttribute('value', e.loaded);
                document.getElementById('pro').setAttribute('max', e.total);
            }
        }

        // CONFIRMATION.
        function transferComplete(e) {
            //alert("Files uploaded successfully.");
        }
        //End File Upload

        function onLoad() {
            vm = $scope;
            vm.files = angular.extend(vm.files || {}, getFilesExtender());

            loadCustomers();

        }

        onLoad();
    }

})();