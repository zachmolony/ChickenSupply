var arr = []

// ========== GET CHICKEN SHOPS FROM JSON ==========

var chicken_shops = []
var map;

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

xhttp.open("GET", "1.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "2.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "3.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "4.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "5.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "6.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "7.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "8.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "9.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "10.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "11.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "12.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "13.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "14.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "15.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "16.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "17.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "18.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "19.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "20.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "21.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "22.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "23.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "24.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "25.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "26.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "27.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "28.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "29.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "30.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "31.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "32.json", true);
xhttp.send();
arr.push(chicken_shops)
xhttp.open("GET", "33.json", true);
xhttp.send();
arr.push(chicken_shops)

/*
setTimeout(function() {
    console.log(arr);
}, 10000);

*/ 