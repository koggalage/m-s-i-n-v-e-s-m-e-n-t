(function(){
    'use strict'

    angular
    .module('app')
    .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$scope'];
    function ContractsController($scope){
        
        var vm = {};

        function getContractExtender()
        {
            var obj = { contract : {} };

            return obj;
        }


        function onLoad()
        {
            vm = $scope;
            
        }
    }

})();