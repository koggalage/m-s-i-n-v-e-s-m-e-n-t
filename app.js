(function(){

    'use strict'

    var env = {};
    
    // Import variables if present (from env.js)
    if(window){  
        Object.assign(env, window.__env);
    }

    var app = angular.module('app',
                                    [
                                        'ui.router', 'LocalStorageModule', 'ngDialog', 'bootstrapLightbox'
                                    ]
                                )
                    .config(config)
     
    app.constant('__env', env);

    app.constant('_',
        window._
    );                    

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider){
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
                        controller: 'AppController'
                    },
                    'header@app':{
                        templateUrl:'/app-components/common/header.html',
                        controller: 'TopPannelController'
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

            .state('app.contract_instalment_details',{
                url: '/contract_instalment_details/:contractId',
                templateUrl:'/app-components/instalments/instalments.details.view.html',
                controller:'InstalmentDetailController'
            })

            .state('app.active_contracts',{
                url:'/active_contracts',
                templateUrl:'/app-components/contracts/contract.list.view.html',
                controller: 'ContractListController'
            })

            .state('app.revenue_report',{
                url:'/revenue_report',
                templateUrl:'/app-components/revenue/revenue.list.view.html',
                controller:'RevenueListController'
            })

            .state('app.accrued_revenue_report',{
                url:'/accrued_revenue_report',
                templateUrl:'/app-components/revenue/accrued.revenue.list.view.html',
                controller:'AccruedRevenueListController'
            })

            .state('app.document_charge_report',{
                url:'/document_charge_report',
                templateUrl:'/app-components/revenue/document.charge.list.view.html',
                controller:'DocumentChargeListController'
            })

            .state('app.contract_close_list',{
                url:'/contract_close_list',
                templateUrl:'/app-components/contracts/contracts.close.list.view.html',
                controller:'ContractCloseController'
            })

            .state('app.instalments_approve_list',{
                url:'/instalments_approve_list',
                templateUrl:'/app-components/instalments/instalments.approve.list.view.html',
                controller:'InstalmentsApproveController'
            })
            
            .state('app.closed_contracts',{
                url:'/closed_contracts',
                templateUrl:'/app-components/contracts/contracts.closed.list.view.html',
                controller: 'ContractClosedListController'
            })

            .state('app.file_upload',{
                url:'/file_upload',
                templateUrl:'/app-components/fileUpload/fileUpload.view.html',
                controller: 'FileController'
            })
            
            .state('app.settings',{
                url:'/settings',
                templateUrl:'/app-components/settings/settings.view.html',
                controller: 'SettingsController'
            });
    }

    
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });    

    // run.$inject = ['$rootScope', '$location', '$http', 'AuthenticationService'];
    // function run($rootScope, $location, $http, AuthenticationService){
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