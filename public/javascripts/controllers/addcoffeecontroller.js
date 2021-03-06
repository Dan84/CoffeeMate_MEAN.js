var app = angular.module('CoffeeMate');

app.controller('addcoffeeController', ['$scope','$location','$http','userProfile', function($scope, $location, $http,userProfile) {
    initialize();
    $scope.formData = {};

    $scope.message = 'New Coffee Page!';
    /*Retrieve the Users Google id*/
    var id = window.localStorage.getItem('user-id');

    /*Adds a coffee with values from input fields*/
    $scope.addCoffee = function(){
        $scope.formData.coffeename = $scope.coffeename;
        $scope.formData.coffeeshop = $scope.coffeeshop;
        $scope.formData.price = $scope.price;
        $scope.formData.latitude = $scope.latitude;
        $scope.formData.longitude = $scope.longitude;
        $scope.formData.userId = id;

        console.log($scope.formData);
        $http.post('/coffee', $scope.formData)
            .success(function(data) {
                $scope.coffees = data;
                $location.path('/coffees')
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



    var map;

    function initialize() {
        var lastMarker;
        var options = {
            enableHighAccuracy: true
        };


        var myLatlng = new google.maps.LatLng(52.33,-6.45);
        var myOptions = {
            zoom: 13,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("coffeeMap"), myOptions);

        var marker = new google.maps.Marker({
            draggable: true,
            position: myLatlng,
            map: map,
            title: "Your location"
        });
        /*Adds listener and drops a marker, removes last marker*/
        google.maps.event.addListener(map, 'click', function(event) {
            marker.setMap(null);
            if(lastMarker != null){
                lastMarker.setMap(null);
            }
            $scope.latitude = event.latLng.lat();
            $scope.longitude = event.latLng.lng();

            lastMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Your coffee Location"
            });
        });

        /*function to ressize the map and pan to location marker when map is opened*/
        $scope.$watch('showMap', function () {
            window.setTimeout(function(){

                google.maps.event.trigger(map, 'resize');
                if(lastMarker) {
                    map.panTo(lastMarker.getPosition());
                }else{map.panTo(marker.getPosition());}
            },0);

        });
    }





}

]);


app.directive('openmap', function() {
    return {
        restrict: 'E',
        replace:true,
        template: '<input type="button" value="Add Location"  class="btn btn-warning">',
        link: function(scope, elem, attrs) {
            elem.bind("click", function(){
                console.log('openmap clicked', elem)
                if(elem.val() == "Add Location") {
                    elem.val("Close Map");
                }
                else {
                    elem.val("Add Location");
                }
                //scope.$apply()
            })
        }
    }
});