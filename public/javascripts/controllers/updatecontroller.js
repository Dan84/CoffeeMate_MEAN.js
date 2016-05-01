var app = angular.module('CoffeeMate');

app.controller('updateController', ['$scope','$location','$http', 'updateCoffee', function($scope,$location, $http, updateCoffee) {

    /*retrieve coffee details from updateCoffee factory*/
    $scope.coffee = updateCoffee.getCoffee();

    $scope.favourite = updateCoffee.getFavourite();

    $scope.activeButton = function() {
        $scope.favourite = !$scope.favourite;
    }


    $scope.formData = {};
    /*Retrieve current rating from updateCoffee factory and retrieve new rating if changed*/
    $scope.rating = {
        current: updateCoffee.getRating(),
        max: 5 };
    $scope.getSelectedRating = function (rating) {
        $scope.coffee.rating = rating
    }

    /*retrive values from fields and update the coffee*/
    $scope.updateCoffee = function(){
        $scope.formData.coffeename = $scope.coffee.coffeename;
        $scope.formData.coffeeshop = $scope.coffee.coffeeshop;
        $scope.formData.price = $scope.coffee.price;
        $scope.formData.rating = $scope.coffee.rating;
        $scope.formData.favourite = $scope.favourite;

        $http.put('/coffees/'+$scope.coffee._id, $scope.formData)
            .success(function(data) {
                console.log(data);
                $location.path('/coffees');
            })
            .error(function(data){
                console.log('Error: ' +data)
            });
    };
}]);

/*Star rating Directive*/
app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };
            updateStars();
            scope.$watch('ratingValue', function ( newVal,oldVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});









