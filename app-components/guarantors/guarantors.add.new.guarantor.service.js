(function(){
    'use strict'

    angular
    .module('app')
    .service('AddNewGuarantorService', AddNewGuarantorService);

    AddNewGuarantorService.$inject = ['$http'];

    function AddNewGuarantorService($http)
    {
        var serviceBase = 'http://localhost:53438/api/Guarantor';
        
        this.createGuarantor = function(Guarantor){
            return $http.post(serviceBase + '/CreateGuarantor', Guarantor);
        };

        this.getGuarantorExistency = function(GuarantorNIC){
            return $http.post(serviceBase + '/GetGuarantorExistency?GuarantorNIC=' + GuarantorNIC);
        }

    }

})();