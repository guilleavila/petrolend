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

require("./routes")(app)

require("./error-handling")(app)

module.exports = app
