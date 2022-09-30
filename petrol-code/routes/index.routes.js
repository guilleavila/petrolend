const router = require("express").Router()
const ApiHandler = require('./../services/APIHandler')
const PriceHandler = new ApiHandler()
const { isLoggedIn, checkRole } = require('./../middleware/route-guard.js')
const { formatNumber } = require('../utils/index')
const User = require('../models/User.model')



// -- GET HOMEPAGE --

router.get("/", isLoggedIn, (req, res, next) => {
  const fuel = req.query.fuel

  User
    .findByIdAndUpdate(req.session.currentUser._id, { currentFuel: fuel }, { new: true })
    .then(user => res.render("index"))
    .catch((err) => next(err))

})


// -- POST HOMEPAGE --

router.post('/', isLoggedIn, (req, res, next) => {

  let userP = User.findById(req.session.currentUser._id)
  let pricesP = PriceHandler.getAllGasStations()

  Promise
    .all([userP, pricesP])
    .then(values => {
      req.body.forEach(elm => {         
        
        // para cada una de las nearby gasolineras del req.body quiero que compares de las de la api la lat y la lng
        
        let temp = values[1].data.ListaEESSPrecio.find(element => formatNumber(elm.lat).includes(element['Latitud'].slice(0, 5))
          && formatNumber(elm.lng).includes(element['Longitud (WGS84)'].slice(0, 5)))  

        const { currentFuel } = values[0]
        elm.price = temp[`Precio ${currentFuel}`]
      })
      res.json(req.body)
    })
})

module.exports = router