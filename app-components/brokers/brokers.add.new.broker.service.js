(function(){
    'use strict'

    angular
    .module('app')
    .service('AddNewBrokerService', AddNewBrokerService);

    AddNewBrokerService.$inject = ['$http'];

    function AddNewBrokerService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Broker';
        
        this.createBroker = function(broker){
            return $http.post(serviceBase + '/CreateBroker', broker);
        };

    }

})();