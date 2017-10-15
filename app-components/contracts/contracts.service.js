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
    }

})();