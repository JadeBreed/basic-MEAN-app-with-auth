ourApp.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'app/pages/home.html',
        controller: 'mainController'
    })
    .when('/login', {
        templateUrl: 'app/pages/login.html',
        controller: 'loginController'
    })
    .when('/register', {
        templateUrl: 'app/pages/register.html',
        controller: 'loginController'
    })
    

});
