const router = require('express').Router()
const Controller = require('../controllers')
const products = require('./products')
const cart = require('./cart')
const session = require('express-session')
// const { route } = require('./products')

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

function alert(req, res, next) {
    if(req.session.isLogin) {
        next()
    } else {
        res.render('loginNotification')
    }
}

router.get('/', Controller.homePage)
router.get('/login', Controller.showFormLogin)
router.post('/login', Controller.successLogin)
router.get('/signup', Controller.showFormSignup)
router.post('/signup', Controller.saveFormSignup)
router.use('/products', products)
router.use('/cart', alert, cart)


module.exports = router