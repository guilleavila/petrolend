const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Introduzca un nombre'],
    trim: true,
    minlength: [3, 'El nombre debe tener mínimo tres letras'],
    // match
  },
  email: {
    type: String,
    required: [true, 'Introduzca un email'],
    lowercase: true,
    trim: true,
    unique: [true, 'Este email ya está registrado']
    // match email válidos
  },
  passwordHash: {
    type: String,
    required: [true, 'Introduzca una constraseña']
    //match
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }
},
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User