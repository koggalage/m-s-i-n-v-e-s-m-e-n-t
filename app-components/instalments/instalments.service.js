(function(){
    'use strict'

    angular
    .module('app')
    .service('InstalmentService', InstalmentService);

    InstalmentService.$inject = ['$http'];

    function InstalmentService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Instalment';
        var reportBase = 'http://localhost:53438/api/RevenueReport';

        this.createInstalment = function(instalment){
            return $http.post(serviceBase + '/CreateInstalment', instalment);
        };

        this.getInstallmentsForContract = function(contractId){
            return $http.get(serviceBase + '/GetInstalmentsForContract?contractId=' + contractId);
        };

        this.getCurrentInstalmentDetails = function(contractId, paidDate){
          return $http.get(serviceBase + '/GetCurrentInstalmentDetails?contractId='+ contractId + '&paidDate='+paidDate);  
        };

        this.getRevenueReport = function(from, to){
            return $http.get(reportBase + '/GetRevenueReport?from='+ from +'&to=' + to);
        };

        this.getAccruedRevenueReport = function(from, to){
            return $http.get(reportBase + '/GetAccruedRevenueReport?from='+ from +'&to=' + to);
        };

        this.getContractsToBeClosed = function(){
            return $http.get(serviceBase + '/GetContractsToBeClosed');
        };
    }

})();