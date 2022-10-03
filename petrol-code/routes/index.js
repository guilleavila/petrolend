module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter)

    const authRouter = require("./auth.routes");
    app.use("/", authRouter)

    const vehicleRouter = require("./vehicle.routes");
    app.use("/vehiculos", vehicleRouter)

    const profileRouter = require("./profile.routes");
    app.use("/perfil", profileRouter)

    const purchaseRouter = require("./purchase.routes");
    app.use("/gastos", purchaseRouter)

    const adminRouter = require("./admin.routes")
    const res = require("express/lib/response")
    app.use("/admin", adminRouter)

}