const router = require('express').Router()
const Purchase = require('../models/Purchase.model')

const ApiHandler = require('./../services/APIHandler')
const PriceHandler = new ApiHandler()


// all purchases
router.get('/', (req, res, next) => {
    res.send('holi')
})

// create purchase

router.post('/crear', (req, res, next) => {
    const { amount, purchasePrice } = req.body

    PriceHandler
        .getAllGasStations()
        .then(allGas => {
            // for(let ) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })

})



module.exports = router