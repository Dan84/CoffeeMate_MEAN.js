var app = angular.module('CoffeeMate');

app.controller('favouritesController', ['$scope','$location','$http','updateCoffee', function($scope,$location, $http, updateCoffee) {
    $scope.message = 'Coffees Page!';

    var id = window.localStorage.getItem('user-id');

    findAll();

    /*find all coffees then add all the favourites to a new list*/
    $scope.favCoffees = []
    function findAll() {
        $http.get('/coffees/'+id)
            .success(function (data) {
               var coffees = data;
                //console.log(data);
                coffees.forEach(function(coffee){
                    if(coffee.favourite){
                        $scope.favCoffees.push(coffee)}
            })
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }

    /*$scope.delete = function(id) {

        if (confirm("Are you sure you want to delete this Coffee?")) {
            //if( $confirm({text: 'Are you sure you want to delete?'})){
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



    $scope.edit = function(coffee){

        updateCoffee.setCoffee(coffee);
        console.log(coffee);
        $location.path('/coffees/'+coffee._id);
    };
*/




}
]);