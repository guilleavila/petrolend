const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gasSchema = new Schema({
    lat: Number,
    lng: Number,
    price: Number
},
    {
        timestamps: true
    }
)

const Gas = mongoose.model('Gas', gasSchema)
module.exports = Gas