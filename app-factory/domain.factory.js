(function(){
    'use strict'

    angular
    .module('app')
    .factory('domain', ['$location', function ($location) {
    var host = $location.host();
    
    if (host.indexOf('.') < 0) 
        return "";
    else
        return host.split('.')[0];
    }]);

})();