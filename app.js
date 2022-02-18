require("dotenv/config")

require("./db")

const express = require("express")

const hbs = require("hbs")

const app = express()

require("./config")(app)
require("./config/session.config")(app)

app.locals.appTitle = `PETROL-END`
app.locals.logoImage = "/images/logo.svg"
app.locals.apiKey = process.env.API_KEY

//ROUTES
const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter)

const authRouter = require("./routes/auth.routes");
app.use("/", authRouter)

const vehicleRouter = require("./routes/vehicle.routes");
app.use("/vehiculos", vehicleRouter)

const profileRouter = require("./routes/profile.routes");
app.use("/perfil", profileRouter)

const purchaseRouter = require("./routes/purchase.routes");
app.use("/gastos", purchaseRouter)

const adminRouter = require("./routes/admin.routes")
const res = require("express/lib/response")
app.use("/admin", adminRouter)

require("./error-handling")(app)

module.exports = app
