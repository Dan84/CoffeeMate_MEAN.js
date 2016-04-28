var app = angular.module('CoffeeMate');

app.controller('coffeesController', ['$scope','$location','$http','updateCoffee', function($scope,$location, $http, updateCoffee) {
    $scope.message = 'Coffees Page!';

    var id = window.localStorage.getItem('user-id');

    findAll();

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

    $scope.delete = function(id) {

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



   /* $scope.incrementUpvotes = function(id){
        $http.put('/donations/'+id +'/votes')
            .success(function(data){
                console.log(data);
                findAll();
            })
            .error(function(data){
                console.log('Error: ' +data);
            });
    }*/

}
]);