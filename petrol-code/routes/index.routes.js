const router = require("express").Router()
const ApiHandler = require('./../services/APIHandler')
const PriceHandler = new ApiHandler()
const isLoggedIn = require('./../middleware/route-guard.js')
const User = require('../models/User.model')



/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  const fuel = req.query.fuel

  // actualizar la fuel en el modelo del usuario
  User
    .findByIdAndUpdate(req.session.currentUser._id, { currentFuel: fuel }, { new: true })
    .then(user => console.log('Esta es la gasofa seleccionada ----->', user.currentFuel))
  res.render("index");
});

router.post('/', (req, res, next) => {
  //console.log(req.body)


  // PriceHandler
  //   .getAllGasStations()
  //   .then(allGas => {
  //     req.body.forEach(elm => {                                                             // para cada una de las nearby gasolineras
  //       temp = allGas.data.ListaEESSPrecio.find(element => formatNumber(elm.lat).includes(element['Latitud'].slice(0, 5))
  //         && formatNumber(elm.lng).includes(element['Longitud (WGS84)'].slice(0, 5)))      // quiero que compares de las de la api la lat y la lng
  //       // llamar al modelo del usuario, y solo coger la que tenga
  //       // tener solo una propiedad precio, en la que se guarda el precio del currentFuel que tiene el usuario en su modelo


  //       elm.priceGA = temp['Precio Gasoleo A']
  //       elm.priceGP = temp['Precio Gasoleo Premium']
  //       elm.priceG95 = temp['Precio Gasolina 95 E5']
  //       elm.priceG98 = temp['Precio Gasolina 98 E5']

  //     })
  //     res.json(req.body)
  //   })
  //   .catch(err => console.log(err))

  let userP = User.findById(req.session.currentUser._id)
  let pricesP = PriceHandler.getAllGasStations()

  Promise
    .all([userP, pricesP])
    .then(values => {
      req.body.forEach(elm => {                                                             // para cada una de las nearby gasolineras
        temp = values[1].data.ListaEESSPrecio.find(element => formatNumber(elm.lat).includes(element['Latitud'].slice(0, 5))
          && formatNumber(elm.lng).includes(element['Longitud (WGS84)'].slice(0, 5)))      // quiero que compares de las de la api la lat y la lng
        // llamar al modelo del usuario, y solo coger la que tenga
        // tener solo una propiedad precio, en la que se guarda el precio del currentFuel que tiene el usuario en su modelo
        if (values[0].currentFuel === 'Gasolina 98 E5') {
          elm.price = temp['Precio Gasolina 98 E5']
        } else if (values[0].currentFuel === 'Gasolina 95 E5') {
          elm.price = temp['Precio Gasolina 95 E5']
        } else if (values[0].currentFuel === 'Gasoleo A') {
          elm.price = temp['Precio Gasoleo A']
        } else if (values[0].currentFuel === 'Gasoleo Premium') {
          elm.price = temp['Precio Gasoleo Premium']
        }
      })
      console.log(req.body)
      res.json(req.body)
    })
})

module.exports = router;


// meter en un archivo a parte en utils e importar
function formatNumber(number) {
  let dotNotation = String(Math.trunc(number * 1000) / 1000)
  let index = dotNotation.indexOf('.')
  let part1 = dotNotation.substring(0, index)
  let part2 = dotNotation.substring(index + 1, dotNotation.length)
  let formated = part1 + ',' + part2
  return formated
}