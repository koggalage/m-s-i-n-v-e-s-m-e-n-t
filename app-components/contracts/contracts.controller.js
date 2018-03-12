(function () {
    'use strict'

    angular
        .module('app')
        .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$scope', 'ngDialog', 'ContractsService', 'AddNewBrokerService', 'CustomerService', 'AddNewGuarantorService', '$stateParams','$state'];
    function ContractsController($scope, ngDialog, ContractsService, AddNewBrokerService, CustomerService, AddNewGuarantorService, $stateParams, $state) {

        var vm = {};
        $scope.showBrokerNotExistWarning = false;
        $scope.showCustomerNotExistWarning = false;
        $scope.showGuarantorNotExistWarning = false;

        $scope.isNoOfInstallmentsDisabled = true;

        function getContractExtender() {
            var obj = { contract: {} };

            obj._createContract = function () {
                CreateContract(obj.contract);
            };

            obj._getMonthlyInstallment = function () {
                GetMonthlyInstallment(obj.contract);
            };

            obj._getDocumentCharge = function () {
                GetDocumentCharge(obj.contract);
            };

            obj._openBrokerPopup = function () {
                OpenBrokerPopup();
            };

            obj._GetBrokerExistency = function () {
                GetBrokerExistency(obj.contract.nic);
            };

            obj._loadLocations = function () {
                loadLocations();
            }

            obj._generateContractNumber = function () {
                generateContractNumber();
            }

            return obj;
        }

        function loadLocations() {
            ContractsService.getAllLocations().then(function (result) {
                vm.contracts.locations = result.data;
            });
        }

        function generateContractNumber() {
            var code = vm.contracts.contract.location;

            ContractsService.generateContractNumber(code.code).then(function (result) {
                vm.contracts.contract.ContractNo = result.data;
            });
        }

        // function OpenBrokerPopup() {
        //     ngDialog.open({
        //         template: '/app-components/brokers/brokers.add.new.broker.view.html',
        //         controller: 'AddNewBrokerController',
        //         scope: $scope,
        //         closeByDocument: true,
        //         data: {}
        //     })
        // }

        function CreateContract(contract) {
            console.log("contract", contract);
            ContractsService.createContract(contract).then(function (result) {
                toastr.success('New Contract Created Successfully!', { timeOut: 3000 });
                $state.transitionTo('app.customer_file_upload', {customer_nic:result.data});           
            }, function (error) {
                toastr.error(error.data.exceptionMessage, { timeOut: 3000 });
            })
        }

        function loadCustomers() {
            $scope.nicCustomer = $stateParams.customer_id;
            GetCustomerExistency($scope.nicCustomer);
            ContractsService.getCustomerDetails().then(function (result) {
                $scope.contractCustomerList = result;

                var customerNICs = [];

                result.data.customerDetails.forEach(function (elm) {
                    customerNICs.push(elm.nic);
                });

                $scope.customerNICs = customerNICs;

            }, function () {
                toastr.error('Failed Loading Customers!', { timeOut: 3000 });
            });
        };

        function loadBrokers() {

            ContractsService.getBrokerDetails().then(function (result) {
                $scope.contractBrokerList = result;

                var brokerNICs = [];

                result.data.brokerDetails.forEach(function (elm) {
                    brokerNICs.push(elm.nic);
                });

                $scope.brokerNICs = brokerNICs;

            }, function () {
                toastr.error('Failed Loading Brokers!', { timeOut: 3000 });
            });
        };

        function loadGuarantors() {

            AddNewGuarantorService.getGuarantorDetails().then(function (result) {
                $scope.contractGuarantorList = result;

                var guarantorNICs = [];

                result.data.guarantorDetails.forEach(function (elm) {
                    guarantorNICs.push(elm.nic);
                });

                $scope.guarantorNICs = guarantorNICs;

            }, function () {
                toastr.error('Failed Loading Guarantors!', { timeOut: 3000 });
            });
        };

        function GetCustomerExistency(customerNIC) {
            CustomerService.getCustomerExistency(customerNIC).then(function (result) {
                $scope.customerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showCustomerNotExistWarning = true;
                    vm.contracts.contract.CustomerId = null;
                } else {
                    $scope.showCustomerNotExistWarning = false;
                    vm.contracts.contract.CustomerId = result.data.id;
                }
            }, function () {
                toastr.error('Failed Loading Customer Existency!', { timeOut: 3000 });
            });
        };

        function GetBrokerExistency(brokerNIC) {
            AddNewBrokerService.getBrokerExistency(brokerNIC).then(function (result) {
                $scope.brokerInfo = result;
                console.log("result", result);
                if (result.data == null) {
                    $scope.showBrokerNotExistWarning = true;
                    vm.contracts.contract.BrokerId = null;
                } else {
                    $scope.showBrokerNotExistWarning = false;
                    vm.contracts.contract.BrokerId = result.data.id;
                }
            }, function () {
                toastr.error('Failed Loading Broker Existency!', { timeOut: 3000 });
            });
        };

        function GetGuarantorExistency(guarantorNIC) {
            AddNewGuarantorService.getGuarantorExistency(guarantorNIC).then(function (result) {
                if (result.data == null) {
                    $scope.showGuarantorNotExistWarning = true;
                    vm.contracts.contract.GuarantorId = null;
                } else {
                    $scope.showGuarantorNotExistWarning = false;
                    vm.contracts.contract.GuarantorId = result.data.id;
                }
                console.log("$scope.isGuarantorExist", $scope.isGuarantorExist);
            }, function () {
                toastr.error('Failed Loading Guarantor Existency!', { timeOut: 3000 });
            });
        };

        function GetMonthlyInstallment(contract) {
            ContractsService.getMonthlyInstallment(contract).then(function (result) {
                vm.contracts.contract.Insallment = result.data;
            }, function (error) {
                toastr.error('Failed to get Monthly Installment!', { timeOut: 3000 });
            });
        }

        function GetDocumentCharge(contract) {
            ContractsService.getDocumentCharge(contract).then(function (result) {
                vm.contracts.contract.DocumentCharge = result.data;
            }, function (error) {
                toastr.error('Failed to get document charge!', { timeOut: 3000 });
            });
        }

        $scope.$watch('nicCustomer', function (newValues, oldValue) {
            if (newValues != oldValue) {
                GetCustomerExistency(newValues);
            }
        });

        $scope.$watch('nicBroker', function (newValues, oldValue) {
            if (newValues != oldValue) {
                GetBrokerExistency(newValues);
            }
        });

        $scope.$watch('nicGuarantor', function (newValues, oldValue) {
            if (newValues != oldValue) {
                GetGuarantorExistency(newValues);
            }
        });


        $scope.completeCustomerNICs = function (string) {
            if (string == null || string == "" || string == undefined) {
                toastr.error('Please enter a valid NIC Number!', { timeOut: 3000 });
            } else {
                GetCustomerExistency(string);
                $scope.hideCustomerNICs = false;
                var output = [];
                angular.forEach($scope.customerNICs, function (nic) {
                    if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                        output.push(nic);
                    }
                });
                $scope.filterNICsCustomer = output;
            }
        };

        $scope.fillTextboxCustomerNICs = function (string) {
            $scope.nicCustomer = string;
            $scope.hideCustomerNICs = true;
        };

        $scope.completeBrokerNICs = function (string) {
            if (string == null || string == "" || string == undefined) {
                toastr.error('Please enter a valid NIC Number!', { timeOut: 3000 });
            } else {
                GetBrokerExistency(string);
                $scope.hideBrokerNICs = false;
                var output = [];
                angular.forEach($scope.brokerNICs, function (nic) {
                    if (nic.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                        output.push(nic);
                    }
                });
                $scope.filterNICsBroker = output;
            }
        };

        $scope.completeGuarantorNICs = function (nicGuarantor) {
            if (nicGuarantor == null || nicGuarantor == "" || nicGuarantor == undefined) {
                toastr.error('Please enter a valid NIC Number!', { timeOut: 3000 });
            } else {
                GetGuarantorExistency(nicGuarantor);
                $scope.hideGuarantorNICs = false;
                var output = [];
                angular.forEach($scope.guarantorNICs, function (nic) {
                    if (nic.toLowerCase().indexOf(nicGuarantor.toLowerCase()) >= 0) {
                        output.push(nic);
                    }
                });
                $scope.filterNICsGuarantor = output;
            }
        };

        $scope.fillTextboxBrokerNICs = function (string) {
            $scope.nicBroker = string;
            $scope.hideBrokerNICs = true;
        };

        $scope.fillTextboxGuarantorNICs = function (string) {
            $scope.nicGuarantor = string;
            $scope.hideGuarantorNICs = true;
        };

        $scope.hideList = function () {
            $scope.hideCustomerNICs = true;
            $scope.hideBrokerNICs = true;
            $scope.hideGuarantorNICs = true;
            //$scope.country = '';
        };

        $scope.$watch('contracts.contract.Amount', function (newValues, oldValue) {
            if (newValues == null || newValues == undefined || newValues == "") {
                $scope.isNoOfInstallmentsDisabled = true;
            } else {
                $scope.isNoOfInstallmentsDisabled = false;
            }
        });

        $scope.onCreateBrokerClick = function () {
            ngDialog.open({
                template: 'app-components/brokers/brokers.add.new.broker.view.html',
                controller: 'AddNewBrokerController',
                scope: $scope,
                closeByDocument: false,
                data: { }
            }).closePromise.then(function(data){
                $scope.nicBroker = data.value;
            });
        };

        $scope.onCreateGuarantorClick = function () {
            ngDialog.open({
                template: 'app-components/guarantors/guarantors.add.new.guarantor.view.html',
                controller: 'AddNewGuarantorController',
                scope: $scope,
                closeByDocument: false,
                data: { }
            }).closePromise.then(function(data){
                $scope.nicGuarantor = data.value;
            });

            
        };

        function onLoad() {
            vm = $scope;
            vm.contracts = angular.extend(vm.contracts || {}, getContractExtender());

            // $scope.tags = [
            //     { text: 'Tag1' },
            //     { text: 'Tag2' },
            //     { text: 'Tag3' }
            // ];

            loadCustomers();
            loadBrokers();
            loadGuarantors();

            vm.contracts._loadLocations();
        }

        onLoad();
    }

})();