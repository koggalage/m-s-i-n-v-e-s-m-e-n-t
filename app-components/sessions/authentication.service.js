(function(){
    'use strict'

    angular
    .module('app')
    .factory('AuthenticationService', ['$http','$q','localStorageService','__env', 'domain',
        function($http, $q, localStorageService, __env, domain){

        var serviceBase = 'http://localhost:53438/';
        var authServiceFactory = {};
        
        var _authentication = {
            isAuth: false,
            userName : ""
        };
        
        var url = __env.ApiPath(domain, '/Token');

        var _login = function(loginData){

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post(serviceBase + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });
                
            return deferred.promise;
        }


        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        }   
        
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
    
        return authServiceFactory;        

    }]);

})();