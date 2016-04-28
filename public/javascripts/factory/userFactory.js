var app = angular.module('CoffeeMate');


app.factory('userProfile', function($q){

    var user = null;
    var isLoggedIn = false;

    var setUser = function(profile){
        window.localStorage.google_user = JSON.stringify(profile);
        window.localStorage.setItem('user-id', profile.getId());
        window.localStorage.setItem('user-pic', profile.getImageUrl());
        isLoggedIn = true;
        console.log('User Factory Set!!!');


    };

    var getAuth = function(){
        if(isLoggedIn){
            return isLoggedIn;
        }
        else{
            return isLoggedIn;
        }
    }

    var removeUser = function(){
        window.localStorage.clear();
        isLoggedIn = false;
    };


    return {
        setUser: setUser,
        //getUser: getUser,
        getAuth: getAuth,
        //getUserId:getUserId,
        removeUser: removeUser

    };


});