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
        }

        this.getContract = function(searchString){
            return $http.get(serviceBase + '/GetContracts?searchString=' + searchString);
        }
        
        this.getBrokerDetails = function(){
            return $http.get(serviceBase + '/LoadBrokerDetails');
        }
        
        this.getCustomersForOpenContracts = function(){
            return $http.get(serviceBase + '/GetCustomersForOpenContracts');
        }

        this.getVehicleNoByCustomerId = function(customerId){
            return $http.get(serviceBase + '/GetVehicleNoByCustomerId?customerId='+ customerId);
        }

        this.getActiveContracts = function(){
            return $http.get(serviceBase + '/GetActiveContracts');
        }

    }

})();