const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    amount: {
        type: String,
        required: [true, 'Introduzca la marca del vehículo'],
        trim: true
    },
    purchasePrice: Number,
    highestPrice: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

const Purchase = mongoose.model('Purchase', purchaseSchema)
module.exports = Purchase