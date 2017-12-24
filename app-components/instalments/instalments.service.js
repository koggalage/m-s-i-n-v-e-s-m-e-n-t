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

        // this.getPaybleAtContractClosingDate = function(contractId, paidDate){
        //     return $http.get(serviceBase + '/GetPaybleAtContractClosingDate?contractId=' + contractId + '&paidDate=' + paidDate);
        // };

        this.getPaybleAtContractClosingDate = function(contractId, paidDate){
            return $http.get(serviceBase + '/GetPaybleAtContractClosingDate?contractId=' + contractId + '&paidDate=' + paidDate);
        };

        this.closeContract = function(closeContract){
            return $http.post(serviceBase + '/CloseContract', closeContract);
        };

        this.getInstalmentsToBeApproved = function(){
            return $http.get(serviceBase + '/GetInstalmentsToBeApproved');
        };

        this.approveInstalment = function(instalmentId){
            return $http.put(serviceBase + '/ApproveInstalment?instalmentId=' + instalmentId);
        };

        this.GetNumberOfInstalmentsForToday = function(){
            return $http.get(serviceBase + '/GetNumberOfInstalmentsForToday');
        };

        this.GetAccruedRevenueForToday = function(){
            return $http.get(serviceBase + '/GetAccuredRevenueForToday');
        };

        this.GetRevenueForToday = function(){
            return $http.get(serviceBase + '/GetRevenueForToday');
        };

        this.GetNumberOfContracts = function(){
            return $http.get(serviceBase + '/GetNumberOfContracts');
        };

        this.GetInstalmentsForToday = function(){
            return $http.get(serviceBase + '/GetInstalmentsForToday');
        };
        
        this.GetContractDetails = function(contractId){
            return $http.get(serviceBase + '/GetContractDetails?contractId=' + contractId);
        };

        this.GetContractDocuments = function(contractId){
            return $http.get(serviceBase + '/GetContractDocuments?contractId=' + contractId);
        };
    }

})();