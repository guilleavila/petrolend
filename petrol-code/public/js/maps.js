let map
let service

function initMap() {
    printMap()
    getCurrentCoords()

    console.log(map)
    let request = {
        location: {
            lat: currentUserPos.lat,
            lng: currentUserPos.lng
        },
        radius: '1500',
        type: ['gas_station']
    }

    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            // createMarker(results[i]);

        }
    }
}

function drawMarker(markerPosition) {
    const { Marker } = google.maps
    new Marker({ map, markerPosition })
}

function printMap() {
    const { Map } = google.maps

    map = new Map(
        document.getElementById('map'),
        {
            zoom: 8,
            center: { lat: 40.41696947339613, lng: - 3.7034544574879935 }
        }
    )
}

let currentUserPos = {}

function getCurrentCoords() {
    navigator.geolocation.getCurrentPosition(
        geolocationDetails => {
            // console.log(geolocationDetails)
            currentUserPos.lat = geolocationDetails.coords.latitude
            currentUserPos.lng = geolocationDetails.coords.longitude
            console.log(currentUserPos)
            centerMap(geolocationDetails)
        },
        errorDetails => console.log(errorDetails)
    )
}

function centerMap(geolocationDetails) {
    const { latitude, longitude } = geolocationDetails.coords
    const position = { lat: latitude, lng: longitude }
    const { Marker } = google.maps

    map.setZoom(15)
    map.setCenter(position)

    new Marker({ map, position })
}


// var map;
// var service;
// var infowindow;

// function initMap() {
//     var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

//     map = new google.maps.Map(document.getElementById('map'), {
//         center: pyrmont,
//         zoom: 15
//     });

//     var request = {
//         location: pyrmont,
//         radius: '3500',
//         type: ['gas_station']
//     };

//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

// function callback(results, status) {

//     const { Marker } = google.maps

//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             console.log(results[i])
//             // (results[i]);
//         }
//     }
// }