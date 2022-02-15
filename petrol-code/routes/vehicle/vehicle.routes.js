const Vehicle = require("../../models/vehicle.model");

const router = require("express").Router();

//list own vehicle
router.get("/", (req, res, next) => {
  Vehicle.find().then((vehicle) =>
    res.render("./vehicle/list-vehicle", { vehicle })
  );
});

//add new vehicle
router.get("/crear", (req, res, next) => {
  res.render("./vehicle/add-vehicle");
});

router.post("/crear", (req, res, next) => {
  const { brand, model, fuelType, averageFuel } = req.body;

  Vehicle.create({ brand, model, fuelType, averageFuel })
    .then(() => res.redirect("/vehiculos"))
    .catch((err) => console.log(err));
});

module.exports = router;
