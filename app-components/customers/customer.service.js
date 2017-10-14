(function(){
    'use strict'

    angular
    .module('app').service('CustomerService', CustomerService);

    CustomerService.$inject = ['$http', 'domain'];

    function CustomerService($http, domain){

        //var baseUri = __env.ApiPath(domain, '/api/Customer');
        var serviceBase = 'http://localhost:53438/api/Customer';
       // var baseUri = '/api/Customer';

        this.createCustomer = function(customer){
            return $http.post(serviceBase + '/CreateCustomer', customer);
        }

    }

})();