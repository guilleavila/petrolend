const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const { isLoggedIn } = require('../middleware/route-guard')
const saltRounds = 10


// -- SIGNUP --

router.get('/registro', (req, res, next) => res.render('auth/signup-form'))

router.post('/registro', (req, res, next) => {
    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(() => res.redirect('/iniciar-sesion'))
        .catch(err => next(err))
})


// -- LOGIN --

router.get('/iniciar-sesion', (req, res, next) => {
    res.render('auth/login-form')
})

router.post('/iniciar-sesion', (req, res, next) => {
    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login-form', { errorMessage: 'Email no registrado' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            } else {
                req.session.currentUser = user
                req.app.locals.isLoggedIn = true
                if (req.session.currentUser.role === "ADMIN") {
                    req.app.locals.isAdmin = true
                } else {
                    req.app.locals.isAdmin = false
                }
                res.redirect('/vehiculos')
            }
        })
        .catch(err => next(err))
})


// -- LOGOUT --

router.post('/cerrar-sesion', isLoggedIn, (req, res, next) => {
    req.app.locals.isLoggedIn = false
    req.app.locals.isAdmin = false
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})


module.exports = router