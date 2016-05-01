//Angular App Module and Controller
var app = angular.module('CoffeeMate');

app.controller('mapController', ['$scope','$http', function ($scope, $http) {
    var id = window.localStorage.getItem('user-id');
    findAll();

    /*find all coffee and call createMarker function to get coffee location from each entry*/
    function findAll() {
        $http.get('/coffees/'+id)
            .success(function (data) {
                $scope.coffees = data;

                for (i = 0; i < $scope.coffees.length; i++){

                    createMarker($scope.coffees[i]);
                }
                //console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(52.33,-6.45),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (coffee){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(coffee.latitude, coffee.longitude),
            title: coffee.coffeename
        });
        marker.content = '<div class="infoWindowContent">' + coffee.coffeeshop + '<br>' +'€'+ coffee.price + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' +  marker.content);
            infoWindow.open($scope.map, marker);
        });

        google.maps.event.addListener($scope.map, 'click', function(){

        });
        $scope.markers.push(marker);

    }
    /*Show information when click on marker*/
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

}]);