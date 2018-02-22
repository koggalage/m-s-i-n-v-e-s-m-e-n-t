(function(){
    'use strict'

    angular
    .module('app')
    .service('ContractsService', ContractsService);
    
    ContractsService.$inject = ['$http'];

    function ContractsService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Contract';
        
        this.createContract = function(contract){
            return $http.post(serviceBase + '/CreateContract', contract);
        };

        this.getCustomerDetails = function(){
            return $http.get(serviceBase + '/GetCustomerDetails');
        };

        this.getContract = function(searchString){
            return $http.get(serviceBase + '/GetContracts?searchString=' + searchString);
        };
        
        this.getBrokerDetails = function(){
            return $http.get(serviceBase + '/LoadBrokerDetails');
        };
        
        this.getCustomersForOpenContracts = function(){
            return $http.get(serviceBase + '/GetCustomersForOpenContracts');
        };

        this.getVehicleNoByCustomerId = function(customerId){
            return $http.get(serviceBase + '/GetVehicleNoByCustomerId?customerId='+ customerId);
        };

        this.getActiveContracts = function(){
            return $http.get(serviceBase + '/GetActiveContracts');
        };

        this.getMonthlyInstallment = function (contract) {
            return $http.get(serviceBase + '/GetMonthlyInstallment?Amount='+ contract.Amount + '&NoOfInstallments=' + contract.NoOfInstallments);
        };

        this.getClosedContracts = function(){
            return $http.get(serviceBase + '/GetClosedContracts');
        };

        this.getDocumentCharge = function(contract){
            return $http.get(serviceBase + '/GetDocumentCharge?amount=' + contract.Amount);
        };

        this.getDocumentChargeReport = function(from, to){
            return $http.get(serviceBase + '/GetDocumentChargeReport?from='+ from +'&to=' + to);
        };

        this.getAllLocations = function(){
            return $http.get(serviceBase + '/GetAllLocations');
        };

        this.addNewLocation = function(location){
            return $http.post(serviceBase + '/AddContractLocation', location);
        };

        this.generateContractNumber = function(code){
            return $http.get(serviceBase + '/GenerateContractNumber?code=' + code);
        };
    }

})();