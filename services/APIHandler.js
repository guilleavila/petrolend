const axios = require('axios')

module.exports = class ApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
        })
    }

    getAllGasStations() {
        return this.axiosApp.get('/')
    }
}
