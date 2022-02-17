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
            center: { lat: 40.41696947339613, lng: - 3.7034544574879935 },
            styles: mapStyles.prueba1,
            streetViewControl: false,
            disableDefaultUI: true
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
    // new Marker({ map, position })
    const imageUser = '../images/user_.svg'
    const marker = new google.maps.Marker({
        position: position,
        animation: google.maps.Animation.DROP,
        map,
        icon: imageUser
        
    })
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
                lng: results[i].geometry.location.lng()
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
                manipulateDoom() 
            })
            // .then(gasStations => {
            //     highestPriceGas(gasStations)
            //     console.log(highestPrice)
            // })
            .catch(err => console.log(err))


    }
}

function drawGas(gasStations) {
    // console.log(highestPriceGas(gasStations))
    let highestPrice = highestPriceGas(gasStations)
    console.log(highestPrice)

    gasStations.forEach(gasStation => {
        // si tiene precio que dibuje el marker
        if (gasStation.price !== '') {
            const LatLng = { lat: gasStation.lat, lng: gasStation.lng }
            const contentForm =
                `<form action="/gastos/crear" method="POST">` +
                `<div class="row g-3 align-items-center">` +
                `<div class="col-auto">` +
                `<label class="col-form-label">Cantidad</label>` +
                `<input type="text" class="form-control mb-2" name="amount" />` +
                `<div class="form-text mb-2">TOTAL €</div>` +
                `</div>` +
                `</div>` +
                `<input type="hidden" class="hidden" name="purchasePrice" value="${gasStation.price}" />` +
                `<input type="hidden" class="hidden" name="highestPrice" value="${highestPrice}" />` +
                `<div class="col-auto">` +
                `<button type="submit" class="btn btn-primary mb-3 nuevo-gasto">Nuevo gasto</button>` +
                `</div>` +
                `</form>`

            const infowindow = new google.maps.InfoWindow({
                content: contentForm
            })

            const image = '../images/marker_.svg'
            const marker = new google.maps.Marker({
                position: LatLng,
                label: {
                    text: `${gasStation.price}€/L`,
                    fontFamily: "Montserrat Alternates",
                    color: "#181818",
                    fontSize: "14px",
                },
                animation: google.maps.Animation.DROP,
                map,
                icon: image,
                title: `${gasStation.price}€/L`
            })

            marker.addListener('click', () => {
                //console.log(gasStation)
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false
                })
            })
        }
    })
}

function highestPriceGas(gasStations) {
    const arr = []
    gasStations.forEach(eachGas => {
        arr.push(eachGas.price)
    })

    arr.sort()
    const highest = arr[arr.length - 1]
    return highest
}
// Lo que nos pase la api de precios lo almacena --> res.json
// hacer el formateo en el backend

function manipulateDoom() {
    
    document.querySelector('.loading').classList.add('running')
    document.querySelector('#map').classList.add('loading')
}