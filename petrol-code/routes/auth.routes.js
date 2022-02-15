const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const saltRounds = 10

// sign-up
router.get('/registro', (req, res, next) => res.render('auth/signup-form'))

router.post('/registro', (req, res, next) => {
    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


//login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login-form'))

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
                res.redirect('/')
            }
        })
        .catch(err => next(err))
})


//logout
router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})


module.exports = router