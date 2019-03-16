DALLAS_CHICKEN = {
    lat: 51.4158,
    lng: -0.1921
}

var map, infoWindow;

function initMap() {
    var options = {
        zoom: 10,
        center: DALLAS_CHICKEN
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

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
};

function locationError(browserHasGeolocation) {
    if (browserHasGeolocation) {
        $('#allowLocation').modal('errorMessage');
    } else {
        $('#allowLocation').innerHTML = "Please enable geolocation in your browser.";
    }
}