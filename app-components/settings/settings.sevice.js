(function(){
    'use strict'

    angular
        .module('app')
        .service('SettingsService', SettingsService);
        
        SettingsService.$inject = ['$http'];

        function SettingsService($http){
            var apiBase = 'http://localhost:53438/api/ContractRate';

            this.createInterestRate = function(rate){
                return $http.post(apiBase + '/AddNewContractRate', rate);
            }

            this.getAllInterestRates = function(type){
                return $http.get(apiBase + '/GetAllRates?type='+  type);
            }

        }
})();