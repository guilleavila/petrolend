require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require('./config/session.config')(app)

app.locals.appTitle = `PETROL-END`;

const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

const vehicleRouter = require("./routes/vehicle.routes");
app.use("/vehiculos", vehicleRouter);
const authRouter = require('./routes/auth.routes')
app.use('/', authRouter)


require("./error-handling")(app);

module.exports = app;
