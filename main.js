DALLAS_CHICKEN = {
    lat: 51.4158,
    lng: -0.1921
}

var chicken_shops = []
var map;

function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
    var directionsService = new google.maps.DirectionsService;

    var options = {
        zoom: 10,
        center: DALLAS_CHICKEN
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('dir-panel'));

    // TOGGLE MENU FUNCTION DESKTOP
    document.getElementById('directions-button').addEventListener('click', function () {
        var x = document.getElementById("dirMenu");
        if (x.style.display === "none") {
            x.style.display = "block";
            map.panBy(200, 0);
        } else {
            x.style.display = "none";
            map.panBy(-200, 0);
        }
    });

    // TOGGLE MENU FUNCTION MOBILE
    document.getElementById('directions-button-mobile').addEventListener('click', function () {
        var x = document.getElementById('dirMenu');
        if (x.style.display === "none") {
            x.style.display = "block";
            map.panBy(0, 150);
        } else {
            x.style.display = "none";
            map.panBy(0, -150);
        }
    });


    /*
    // DALLAS MARKER
    new google.maps.Marker({
        position: DALLAS_CHICKEN,
        map: map,
        icon: 'assets/dallasicon.png'
    });
    */

    // =============  USER LOCATION  =============

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            document.getElementById('mode').addEventListener('change', function () { // listen for the user changing method
                getDirections(directionsService, directionsDisplay, userPos, findClosestShop(chicken_shops, userPos));
            });

            // USER MARKER
            new google.maps.Marker({
                position: userPos,
                map: map,
                icon: 'assets/usericon.png'
            });

            setTimeout(function () {

                // GET DIRECTIONS TO NEAREST SHOP, needs to wait for json data
                getDirections(directionsService, directionsDisplay, userPos, findClosestShop(chicken_shops, userPos));

                for (var i = 0; i < chicken_shops.length; i++) {
                    new google.maps.Marker({
                        position: {
                            lat: chicken_shops[i][1].lng,
                            lng: chicken_shops[i][1].lat
                        },
                        map: map,
                        icon: 'assets/dallasicon.png'
                    });
                }
            }, 1000);

            // ZOOM INTO ROUTE
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(DALLAS_CHICKEN);
            bounds.extend(userPos);
            window.bounds = bounds; // gloablise for refitting when we open the panel
            map.fitBounds(bounds, 200);

        }, function () {
            locationError(true);
        });
    } else {
        // NO GEOLOCATION
        locationError(false);
    }
}

// CALCULATE AND DISPLAY DIRECTIONS
function getDirections(directionsService, directionsDisplay, userPos, shopLocation) {
    
    // fetch chosen method
    var transportMethod = document.getElementById('mode').value;
    directionsService.route({
        origin: userPos,
        destination: {
            lat: shopLocation.lng,
            lng: shopLocation.lat
        },
        travelMode: google.maps.TravelMode[transportMethod]
    }, function (response, status) { // check for 
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else { // if there is an error getting directions
            var mymodal = $('#errorModal');
            mymodal.find('.modal-body').text('Sorry, we can\'t seem to find a way to Dallas Chicken.');
            $('#errorModal').modal('toggle');
        }
    });
}

//   LOCATION ERRORS
function locationError(browserHasGeolocation) {
    if (browserHasGeolocation) {
        var mymodal = $('#errorModal');
        mymodal.find('.modal-body').text('Please allow Chicken Supply to know your location.');
        $('#errorModal').modal('toggle');
    } else {
        var mymodal = $('#errorModal');
        mymodal.find('.modal-body').text('Geolocation is not suppourted by your browser.');
    }
}

// ========== GET CHICKEN SHOPS FROM JSON ==========

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var shops = response.EstablishmentCollection.EstablishmentDetail;

        for (var i = 0; i < shops.length; i++) {
            if (shops[i].Geocode === "" || shops[i].BusinessType !== "Takeaway/sandwich shop") {
                continue;
            };

            shop = {};
            if (shops[i].BusinessName.includes("Chicken") || shops[i].BusinessName.includes("Peri")) {
                chicken_shops.push([shops[i].BusinessName, {
                    "lat": Number(shops[i].Geocode.Longitude),
                    "lng": Number(shops[i].Geocode.Latitude)
                }]);
            };
        }
    }
}

xhttp.open("GET", "merton.json", true);
xhttp.send();

function findClosestShop(chicken_shops, userPos) {

    // have to make proper object for this bc geometry requires it
    var user = new google.maps.LatLng(userPos.lat, userPos.lng);

    // calculate distance for each shop
    for (var i = 0; i < chicken_shops.length; i++) {

        var myLatLng = new google.maps.LatLng(chicken_shops[i][1].lng, chicken_shops[i][1].lat);

        chicken_shops[i].push(google.maps.geometry.spherical.computeDistanceBetween(user, myLatLng));
    };

    // return the minimum value of the new pushed item in the sublists and return index
    var lowest = 0;
    for (var i = 1; i < chicken_shops.length; i++) {
        if (chicken_shops[i][2] < chicken_shops[lowest][2]) {
            lowest = i;
        }
    }

    // return coords of closest shop
    return chicken_shops[lowest][1];
}