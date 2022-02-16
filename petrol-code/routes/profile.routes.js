const res = require("express/lib/response");
const User = require("../models/User.model");
const Vehicle = require("../models/Vehicle.model");
<<<<<<< HEAD
=======
const Purchase = require("../models/Purchase.model");
const isLoggedIn = require("../middleware/route-guard");
>>>>>>> rii
const router = require("express").Router();

//profile view

router.get("/", isLoggedIn, (req, res, next) => {
  let userPromise = User.findById(req.session.currentUser._id);
  let vehiclePromise = Vehicle.find({ owner: req.session.currentUser._id });
  let purchasePromise = Purchase.find({ owner: req.session.currentUser._id });

  Promise.all([userPromise, vehiclePromise, purchasePromise]).then((values) => {
    // console.log(values);

    res.render("./profile/detail-profile", {
      user: values[0],
      vehicles: values[1],
      purchase: values[2],
    });
  });
});

module.exports = router;