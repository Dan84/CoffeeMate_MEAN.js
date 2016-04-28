var app = angular.module('CoffeeMate');


app.factory('updateCoffee', function(){

    var coffee = null;

    var setCoffee = function(coffee){
        this.coffee = coffee;

    };
    var getCoffee = function(){
        return this.coffee;
    };
    var getRating = function(){
        //console.log(this.coffee.rating+"factory");
        return this.coffee.rating;
    };
    var getFavourite = function(){
        //console.log(this.coffee.favourite+"factory");
        return this.coffee.favourite;
    };

    return {
        setCoffee: setCoffee,
        getCoffee: getCoffee,
        getRating: getRating,
        getFavourite: getFavourite
    };



});