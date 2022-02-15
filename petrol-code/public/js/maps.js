let map
let service
let currentUserPos = {}

function initMap() {
    getCurrentCoords()
    printMap()
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

function getCurrentCoords() {
    navigator.geolocation.getCurrentPosition(
        geolocationDetails => {
            // console.log(geolocationDetails)
            currentUserPos.lat = geolocationDetails.coords.latitude
            currentUserPos.lng = geolocationDetails.coords.longitude
            console.log('Tu posición es ------>', currentUserPos)
            centerMap(geolocationDetails)
            searchNearbyGas()
        },
        errorDetails => console.log(errorDetails)
    )
}

function centerMap(geolocationDetails) {
    const { latitude, longitude } = geolocationDetails.coords
    const position = { lat: latitude, lng: longitude }
    const { Marker } = google.maps

    map.setZoom(14.5)
    map.setCenter(position)

    // marcador de geolocalización
    new Marker({ map, position })
}

function searchNearbyGas() {
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

    const gasLocations = []

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log('Estas son las gasolineras cercanas ----->', results[i]);
            // console.log('Esta es su location ------>', results[i].geometry.location.lat())
            // console.log('Esta es su location ------>', results[i].geometry.location.lng())

            const gasStation = {
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng(),
                priceGA: "",
                priceGP: "",
                priceG95: "",
                priceG98: "",
            }
            // pushear a un array los datos que queremos
            gasLocations.push(gasStation)
        }
        // console.log(gasLocations)


        // Hacer una llamada a axios.post para que mande al back la info de las gasolineras de google, pasándole
        // los datos de localización
        axios
            .post('/', gasLocations)
            .then(response => {
                // console.log(response.data)
                drawGas(response.data)

            })
            .catch(err => console.log(err))


    }
}

function drawGas(gasStations) {
    // console.log(gasStations)
    gasStations.forEach(gasStation => {
        const LatLng = { lat: gasStation.lat, lng: gasStation.lng }

        new google.maps.Marker({
            position: LatLng,
            map,
            title: `${gasStation.priceG95}€/L G95`
        })
    });
}

// Lo que nos pase la api de precios lo almacena --> res.json
// hacer el formateo en el backend