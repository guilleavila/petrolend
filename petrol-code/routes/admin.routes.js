const router = require('express').Router()

const User = require('./../models/User.model')
const Vehicle = require("../models/Vehicle.model");
const Purchase = require("../models/Purchase.model")

const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const { isAdmin } = require("../utils")


//stats
router.get("/", isLoggedIn, checkRole("ADMIN"), (req, res, next) => {
    
    let listUserPromise = User.find()
    let listVehiclePromise = Vehicle.find()
    let listPurchasePromise = Purchase.find()

    Promise.all([listUserPromise, listVehiclePromise, listPurchasePromise])
    .then((values) => {
        res.render("./admin/stats-admin", 
        {
            user: values[0],
            vehicles: values[1],
            purchase: values[2]
        })
    })
    .catch(err => console.log(err))
})

//delete user

router.post("/eliminar/:user_id", isLoggedIn, checkRole("ADMIN"), (req, res, next) => {
    const { user_id } = req.params

    User.findByIdAndDelete(user_id)
        .then(() => res.redirect("/admin"))
        .catch((err) => console.log(err))
})

module.exports = router;
 