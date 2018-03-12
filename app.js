(function(){

    'use strict'

    var env = {};
    
    // Import variables if present (from env.js)
    if(window){  
        Object.assign(env, window.__env);
    }

    var app = angular.module('app',
                                    [
                                        'ui.router', 'LocalStorageModule', 'ngDialog', 'bootstrapLightbox', 'pascalprecht.translate', 'ngStorage'
                                    ]
                                )
                    .config(config)
     
    app.constant('__env', env);

    app.constant('_',
        window._
    );                    

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
    function config($stateProvider, $urlRouterProvider, $translateProvider){
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
            
            .state('app.customer_file_upload',{
                url:'/file_upload/:customer_nic',
                templateUrl:'/app-components/fileUpload/fileUpload.view.html',
                controller: 'FileController'
            })

            .state('app.settings',{
                url:'/settings',
                templateUrl:'/app-components/settings/settings.view.html',
                controller: 'SettingsController'
            });



            //tmhDynamicLocaleProvider.localeLocationPattern('./app-scripts/globalization/angular-locale_{{locale}}.js');

            // $translateProvider.useSanitizeValueStrategy(null);
            // $translateProvider.useStaticFilesLoader({
            //     prefix: './app-content/i18n/resource.',
            //     suffix: '.json'
            // });
            // $translateProvider.preferredLanguage('en');

            $translateProvider.translations('en', {
                Add_New_Customer: 'Add new customer',
                NIC: 'NIC:',
                Name: 'Name:',
                Address: 'Address:',
                Mobile_No: 'Mobile No:',
                Occupation: 'Occupation:',
                Description: 'Description:',
                Create_New_Contract: "Create new contract",
                Customer_NIC: 'Customer NIC:',
                Amount: 'Amount:',
                Document_Charge: 'Document Charge:',
                No_Of_Installments: 'No of installments:',
                Monthly_Installment: 'Monthly Installment:',
                Vehicle_No: 'Vehicle No:',
                NIC_Of_The_Guarantor: 'NIC of the guarantor:',
                NIC_Of_The_Broker: 'NIC of the broker:',
                Contract_Process_Location: 'Contract process Location:',
                Contract_Number: 'Contract Number:',
                Upload_Documents: 'Upload Documents',
                Instalment: 'Instalment:',
                Due_Date: 'Due Date:',
                Paid_Date: 'Paid Date:',
                Paid_Amount: 'Paid amount:',
                Save: 'Save:'

              });
              $translateProvider.translations('nb', {
                Add_New_Customer: 'අලුත් ණයකරුවෙකු ඇතුළත් කිරීම',
                NIC: 'ජා.හැ.අං:',
                Name: 'නම:',
                Address: 'ලිපිනය:',
                Mobile_No: 'දුරකථන අංකය:',
                Occupation: 'රැකියාව:',
                Description: 'වෙනත් විස්තර:',
                Create_New_Contract: "අලුත් ගිවිසුමක් ඇතුළත් කිරීම",
                Customer_NIC: 'ණයකරුගේ ජා.හැ.අං:',
                Amount: 'මුළු ණය මුදල:',
                Document_Charge: 'ලිපිගොණු වියදම:',
                No_Of_Installments: 'වාරික ගණන:',
                Monthly_Installment: 'මාසික වාරිකය:',
                Vehicle_No: 'වාහන අංකය:',
                NIC_Of_The_Guarantor: 'ඇපකරුගේ ජා.හැ.අං:',
                NIC_Of_The_Broker: 'තැරැව්කරුගේ ජා.හැ.අං:',
                Contract_Process_Location: 'කාර්යාලය අයත් නගරය:',
                Contract_Number: 'ගිවිසුම් අංකය:',
                Upload_Documents: 'ඡායාරූප ඇතුළත් කිරීම:',
                Instalment: 'වාරික ගෙවීම:',
                Due_Date: 'වාරිකය ගෙවීමට නියමිත දිනය:',
                Paid_Date: 'වාරිකය ගෙවූ දිනය',
                Paid_Amount: 'ගෙවූ වාරික මුදල:',
                Save: 'දත්ත ඇතුළත් කරන්න:'
              });

              $translateProvider.preferredLanguage('en');
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