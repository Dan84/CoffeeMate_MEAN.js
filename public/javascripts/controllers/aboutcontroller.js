var app = angular.module('CoffeeMate');

app.controller('aboutController', ['$scope', function($scope) {
    $scope.message = 'Look, I\'m an About Page!';
}
]);