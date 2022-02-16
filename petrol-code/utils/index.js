const mongoose = require('mongoose')

//role
const isAdmin = user => user.role === "ADMIN"



module.exports = { isAdmin }