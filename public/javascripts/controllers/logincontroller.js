var app = angular.module('CoffeeMate');


app.controller('loginController', ['$scope', 'userProfile', function($scope, userProfile) {

    $scope.showLogout = true;

        /*Signs in the User and retrieves information passing to UserProfile factory and photo to windowStorage*/
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            //console.log(window.localStorage.getItem('user-pic'));
            userProfile.setUser(profile);

            $scope.pimg = window.localStorage.getItem('user-pic');

            $scope.setImage = function(){
                return{
                    'image':'url('+$scope.pimg+')'
                }
            }

            $scope.showImg;
            $scope.showLogout = false;
            $scope.showImg = false;
            $scope.$apply();
        }
        window.onSignIn = onSignIn;

        /*signs out user from Google account and calls remove user from userProfile factory*/
        $scope.signOut = function()  {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                userProfile.removeUser();
                $scope.showLogout = true;
                $scope.showImg = true;
                $scope.$apply();
                //console.log('User signed out.');

            });
        }


}
]);