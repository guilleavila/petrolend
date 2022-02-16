const Vehicle = require("../models/vehicle.model");

const router = require("express").Router();

//list own vehicle
router.get("/", (req, res, next) => {
  Vehicle.find({ owner: req.session.currentUser._id }).then((vehicle) =>
    res.render("./vehicle/list-vehicle", { vehicle })
  );
});

//add new vehicle
router.get("/crear", (req, res, next) => {
  res.render("./vehicle/add-vehicle");
});

router.post("/crear", (req, res, next) => {
  const { brand, model, fuelType, averageFuel } = req.body;

  Vehicle.create({
    brand,
    model,
    fuelType,
    averageFuel,
    owner: req.session.currentUser._id,
  })
    .then(() => res.redirect("/vehiculos"))
    .catch((err) => console.log(err));
});

//edit vehicle
router.get("/editar/:vehicle_id", (req, res, next) => {
  const { vehicle_id } = req.params;

  Vehicle.findById(vehicle_id)
    .then((vehicle) => res.render("vehicle/edit-vehicle", vehicle))
    .catch((err) => console.log(err));
});

router.post("/editar/:vehicle_id", (req, res, next) => {
  const { vehicle_id } = req.params;
  const { brand, model, fuelType, averageFuel } = req.body;

  Vehicle.findByIdAndUpdate(
    vehicle_id,
    { brand, model, fuelType, averageFuel },
    { new: true }
  )
    .then((updatedVehicle) => res.redirect("/vehiculos"))
    .catch((err) => console.log(err));
});

//delete vehicle
router.post("/eliminar/:vehicle_id", (req, res, next) => {
  const { vehicle_id } = req.params;

  Vehicle.findByIdAndDelete(vehicle_id)
    .then(() => res.redirect("/vehiculos"))
    .catch((err) => console.log(err));
});

module.exports = router;