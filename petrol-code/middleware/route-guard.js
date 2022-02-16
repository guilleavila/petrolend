const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'Inicia sesión para acceder'
    })
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.redirect('/iniciar-sesion'), {
        errorMessage: `Acceso denegado, solo administradores`
    }
}


module.exports = { isLoggedIn, checkRole }