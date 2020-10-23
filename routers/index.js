const router = require('express').Router()
const Controller = require('../controllers')
const products = require('./products')
const cart = require('./cart')


router.get('/', Controller.homePage)
router.use('/products', products)

router.get('/login', Controller.showFormLogin)
router.post('/login', Controller.successLogin)
router.get('/signup', Controller.showFormSignup)
router.post('/signup', Controller.saveFormSignup)
router.get('/checkout/:id', Controller.sendMail)
router.use('/cart', cart)


module.exports = router