const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    amount: {
        type: String,
        required: [true, 'Introduzca la cantidad pagada'],
        trim: true
    },
    purchasePrice: String,
    highestPrice: String,
    saving: Number,
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
Purchase.syncIndexes()
module.exports = Purchase