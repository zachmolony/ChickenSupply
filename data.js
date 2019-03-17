var chicken_shops = []

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var shops = response.EstablishmentCollection.EstablishmentDetail;

        for (var i = 0; i < shops.length; i++) {
            if (shops[i].BusinessType === "Takeaway/sandwich shop" && shops[i].BusinessName.includes("Chicken")) {
                chicken_shops.push(shops[i].BusinessName, shops[i].Geocode);
            };
        }
    }
}

xhttp.open("GET", "merton.json", true);
xhttp.send();

console.log(chicken_shops);

// && shops[i].BusinessName.includes("Chicken") && 