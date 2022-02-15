require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

app.locals.appTitle = `PETROL-END`;

const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

const vehicleRouter = require("./routes/vehicle/vehicle.routes");
app.use("/vehiculos", vehicleRouter);

require("./error-handling")(app);

module.exports = app;
