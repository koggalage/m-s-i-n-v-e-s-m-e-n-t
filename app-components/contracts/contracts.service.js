(function(){
    'use strict'

    angular
    .module('app')
    .service('ContractsService', ContractsService);
    
    ContractsService.$inject = ['$http'];

    function ContractsService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Broker';
        
        this.createContract = function(contract){
            return $http.post(serviceBase + '/CreateContract', contract);
        };
    }

})();