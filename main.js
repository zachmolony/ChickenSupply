function initMap() {
    var options = {
        zoom:10,
        center: {lat:51.4158, lng:-0.1921}
    }

    var map = new google.maps.Map(document.getElementById('map'), options)
}