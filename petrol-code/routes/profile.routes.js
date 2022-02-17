const User = require("../models/User.model")
const Vehicle = require("../models/Vehicle.model")
const Purchase = require("../models/Purchase.model")
const { isLoggedIn } = require("../middleware/route-guard")
const router = require("express").Router()

//profile view

router.get("/", isLoggedIn, (req, res, next) => {
  let userPromise = User.findById(req.session.currentUser._id)
  let vehiclePromise = Vehicle.find({ owner: req.session.currentUser._id })
  let purchasePromise = Purchase
  .find({ owner: req.session.currentUser._id })

  Promise
    .all([userPromise, vehiclePromise, purchasePromise])
    .then((values) => {

      const [user, vehicles, purchase] = values
      let totalSaving = 0
    purchase.forEach(eachPurchase => {
      totalSaving += eachPurchase.saving
    })

      res.render("./profile/detail-profile", {
        user,
        vehicles,
        purchase,
        totalSaving
      })
    })
    .catch((err) => next(err))
})

module.exports = router