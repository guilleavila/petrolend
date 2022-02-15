const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'Inicia sesión para acceder'
    })
}



module.exports = isLoggedIn