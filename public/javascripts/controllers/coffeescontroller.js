var app = angular.module('CoffeeMate');

app.controller('coffeesController', ['$scope','$location','$http','updateCoffee', function($scope,$location, $http, updateCoffee) {
    $scope.message = 'Coffees Page!';
    /*retrieve users Google id*/
    var id = window.localStorage.getItem('user-id');

    findAll();

    /*find all coffees based on the users id*/
    function findAll() {
        $http.get('/coffees/'+id)
            .success(function (data) {
                $scope.coffees = data;
                //console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    /*Delete coffee function*/
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this Coffee?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/coffees/'+id)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data){
                    console.log('Error: ' +data)
                });


        }
    };


    /*this function passes coffee details to updateCoffee factory*/
    $scope.edit = function(coffee){

        updateCoffee.setCoffee(coffee);
        //console.log(coffee);
        $location.path('/coffees/'+coffee._id);
    };





}
]);