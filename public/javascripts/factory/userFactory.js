var app = angular.module('CoffeeMate');


app.factory('userProfile', function($q){

    var user = null;
    var isLoggedIn = false;

    /*Add required infromation to local storage*/
    var setUser = function(profile){
        window.localStorage.google_user = JSON.stringify(profile);
        window.localStorage.setItem('user-id', profile.getId());
        window.localStorage.setItem('user-pic', profile.getImageUrl());
        isLoggedIn = true;
        //console.log('User Factory Set!!!');


    };

    /*function to check if user is logged in*/
    var getAuth = function(){
        if(window.localStorage.getItem('user-id')){
            isLoggedIn = true
            return isLoggedIn;
        }
        else{
            return isLoggedIn;
        }
    }

    /*remove user info from local storage*/
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