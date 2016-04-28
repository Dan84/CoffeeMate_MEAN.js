var app = angular.module('CoffeeMate', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider


        .when('/', {
            templateUrl : 'pages/home.ejs',
            controller  : 'mainController'
        })

        .when('/about', {
            templateUrl : 'pages/about.ejs',
            controller  : 'aboutController'
        })

        .when('/contact', {
            templateUrl : 'pages/contact.ejs',
            controller  : 'contactController'
        })

        .when('/coffees/:id', {
            templateUrl : 'pages/updatecoffee.ejs',
            controller  : 'updateController',
            resolve:{loggedIn:onlyLoggedIn}
        })
        .when('/coffee', {
            templateUrl : 'pages/addcoffee.ejs',
            controller  : 'addcoffeeController',
            resolve:{loggedIn:onlyLoggedIn}
        })

        .when('/favourites', {
            templateUrl : 'pages/favourites.ejs',
            controller  : 'favouritesController',
            resolve:{loggedIn:onlyLoggedIn}
        })

        .when('/coffees', {
            templateUrl : 'pages/coffees.ejs',
            controller  : 'coffeesController',
            resolve:{loggedIn:onlyLoggedIn}
        })


        .when('/map', {
            templateUrl : 'pages/map.ejs',
            controller  : 'mapController',
            resolve:{loggedIn:onlyLoggedIn}
        })


});

var onlyLoggedIn = function ($location,$q,userProfile) {
    var deferred = $q.defer();
    if (userProfile.getAuth()) {
        deferred.resolve();
        //console.log("logged in");
    } else {
        deferred.reject();
        //console.log("not logged");
        $location.url('/');
    }
    return deferred.promise;
};




