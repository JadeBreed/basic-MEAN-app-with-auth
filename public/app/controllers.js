// CONTROLLERS
ourApp.controller('mainController', ['$scope', '$location','$http', function($scope, $location, $http) {

    $scope.toLogin = function(){
        $location.path('/login');
    }
    $scope.toRegister = function(){
        $location.path('/register');
    }
    $scope.logout = function(){
        $http.get('/logout');
    }
    $scope.secret = function(){
        $http.get('/secret');
    }
}]);

