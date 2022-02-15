const res = require("express/lib/response");
const User = require("../models/User.model");
const Vehicle = require("../models/vehicle.model");
const router = require("express").Router();

//profile view

// router.get("/:user_id", (req, res, next) => {
//   const { user_id } = req.params;

//   const data = {};
//   Vehicle.find({ owner: user_id })
//     .then((vehicles) => {
//       data.vehicles = vehicles;
//       return User.findById({ user_id });
//     })
//     .then((users) => {
//       data.users = users;
//       Promise.all(data);
//     })
//     .then((data) => res.render("detail-profile", data));
// });

module.exports = router;
