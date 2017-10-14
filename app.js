(function(){

    'use strict'

    var env = {};
    
    // Import variables if present (from env.js)
    if(window){  
        Object.assign(env, window.__env);
    }

    var app = angular.module('app',
                                    [
                                        'ui.router', 'LocalStorageModule', 'ngDialog'
                                    ]
                                )
                    .config(config)
     
    app.constant('__env', env);

    app.constant('_',
        window._
    );                    

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider){
        debugger;
        //$urlRouterProvider.otherwise('/app');
        $urlRouterProvider.otherwise('/sessions/new');
        

        $stateProvider
            .state('login',{
                url: '/sessions/new',
                templateUrl: '/app-components/sessions/sessions.view.html',
                controller: 'SessionsController'
            })

            .state('app',{
                url:'/app',
                views: {
                    '@':{
                        templateUrl: '/app-components/app/app.view.html',
                    },
                    'header@app':{
                        templateUrl:'/app-components/common/header.html'
                    }
                }
            })

            .state('app.customer',{
                url:'/customer',
                templateUrl:'/app-components/customers/customer.add.customer.html',
                controller:'CustomersController'
            })

            .state('app.contract',{
                url:'/contract/:customer_id',
                templateUrl:'/app-components/contracts/contracts.new.contract.view.html',
                controller:'ContractsController'
            })

            .state('app.instalment',{
                url: '/instalment',
                templateUrl: '/app-components/instalments/installments.view.html',
                controller:'InstalmentController'
            })

    }

    
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });    

    // run.$inject = ['$rootScope', '$location', '$http', 'AuthenticationService'];
    // function run($rootScope, $location, $http, AuthenticationService){
    //     debugger;
    //     // $rootScope.isUserLoggedIn = function () {
    //     //     if ($rootScope.globals.currentUser) {
    //     //         return true;
    //     //     }
    //     //     else {
    //     //         return false;
    //     //     }
    //     // }

    //     // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //     //     //start loading bar with white background for state changes 
    //     //     //$rootScope.loadingBarChange();

    //     //     // redirect to login page if not logged in and trying to access a restricted page
    //     //    // var restrictedPage = $.inArray($location.path(), ['/sessions/new', '/register', '/', '']) === -1;
    //     //     //var loggedIn = $rootScope.globals.currentUser;
    //     //     //if (restrictedPage && !loggedIn) {
    //     //         //$location.path('/app');
    //     //     //}
    //     // });

    //     $location.path('/sessions/new');
    //     AuthenticationService.fillAuthData();

    // }

    app.run(['AuthenticationService', function (authService) {
        authService.fillAuthData();
    }]);

})();