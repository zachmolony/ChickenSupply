DALLAS_CHICKEN = {
    lat: 51.4158,
    lng: -0.1921
}

var map, infoWindow;

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

    // DALLAS MARKER
    new google.maps.Marker({
        position: DALLAS_CHICKEN,
        map: map,
        icon: 'assets/dallasicon.png'
    });

    // =============  USER LOCATION  =============

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            getDirections(directionsService, directionsDisplay, userPos);
            document.getElementById('mode').addEventListener('change', function () {
                getDirections(directionsService, directionsDisplay, userPos);
            });

            // USER MARKER
            new google.maps.Marker({
                position: userPos,
                map: map,
                icon: 'assets/usericon.png'
            });

            // ZOOM INTO ROUTE
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(DALLAS_CHICKEN);
            bounds.extend(userPos);
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
function getDirections(directionsService, directionsDisplay, userPos) {
    var transportMethod = document.getElementById('mode').value;
    directionsService.route({
        origin: userPos,
        destination: DALLAS_CHICKEN,
        travelMode: google.maps.TravelMode[transportMethod]
    }, function (response, status) {   // handle errors
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {    // if there is an error getting directions
            $(function () {    // diplay modal with message
                var mymodal = $('#allowLocation');
                mymodal.find('.modal-body').text('Sorry, we can\'t seem to find a way to Dallas Chicken.');
            })
            $('#allowLocation').modal('toggle');
        }
    });
}

//   LOCATION ERRORS
function locationError(browserHasGeolocation) {
    if (browserHasGeolocation) {
        $(function () {
            var mymodal = $('#allowLocation');
            mymodal.find('.modal-body').text('Please allow Chicken Supply to know your location.');
        })
        $('#allowLocation').modal('toggle');
    } else {
        $(function () {
            var mymodal = $('#allowLocation');
            mymodal.find('.modal-body').text('Please enable geolocation in your browser.');
        })
    }
}