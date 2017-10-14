(function(){
    'use strict'

    angular
    .module('app')
    .service('InstalmentService', InstalmentService);

    InstalmentService.$inject = ['$http'];

    function InstalmentService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Instalment';

        this.createInstalment = function(instalment){
            return $http.post(serviceBase + '/CreateInstalment', instalment);
        };
    }

})();