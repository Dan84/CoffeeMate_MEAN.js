var app = angular.module('CoffeeMate');

app.controller('updateController', ['$scope','$location','$http', 'updateCoffee', function($scope,$location, $http, updateCoffee) {

    $scope.coffee = updateCoffee.getCoffee();

    $scope.favourite = updateCoffee.getFavourite();
    console.log( $scope.favourite+"  booga");
    $scope.activeButton = function() {
        $scope.favourite = !$scope.favourite;
        console.log($scope.favourite+" its a fave");
    }


    $scope.formData = {};
    //var current = 1;
    //$scope.rating =
    $scope.rating = {
        current: updateCoffee.getRating(),
        max: 5 };
    $scope.getSelectedRating = function (rating) {
        console.log(rating);
        $scope.coffee.rating = rating
    }

    $scope.updateCoffee = function(){
        console.log( $scope.favourite+"  booga");
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


/*
app.directive('buttonFavorite', function() {
    return {
        scope: true,
        restrict: 'E',
        template: '<button class="btn btn-icon"><span class="glyphicon glyphicon-heart" ng-class="{active: item.favorite}" ></span></button>',
        link: function(scope, elem) {
            elem.bind('click', function() {
                scope.toggle(function(){
                    scope.item.favorite = !scope.item.favorite;
                });
            });
        }
    };
});
*/






