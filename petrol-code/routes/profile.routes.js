const User = require("../models/User.model")
const Vehicle = require("../models/Vehicle.model")
const Purchase = require("../models/Purchase.model")
const { isLoggedIn } = require("../middleware/route-guard")
const router = require("express").Router()


// -- PROFILE --

router.get("/", isLoggedIn, (req, res, next) => {

  const { _id } = req.session.currentUser

  const userPromise = User.findById(_id)
  const vehiclePromise = Vehicle.find({ owner: _id })
  const purchasePromise = Purchase.find({ owner: _id })

  Promise
    .all([userPromise, vehiclePromise, purchasePromise])
    .then((values) => {

      const [user, vehicles, purchase] = values

      let totalSaving = 0
      purchase.forEach(eachPurchase => {
        totalSaving += Math.round(eachPurchase.saving * 100)
      })

      const finalSaving = totalSaving / 100

      res.render("./profile/detail-profile", {
        user,
        vehicles,
        purchase,
        finalSaving
      })
    })
    .catch((err) => next(err))
})

module.exports = router