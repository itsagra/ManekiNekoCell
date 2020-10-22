const router = require('express').Router()
const Controller = require('../controllers')
const products = require('./products')
const cart = require('./cart')


router.get('/', Controller.homePage)
router.use('/products', products)
router.use('/cart', cart)
router.get('/signUp', Controller.showForm)
router.post('/signUp', Controller.saveForm)
router.get('/login', Controller.showFormLogin)
router.post('/login', Controller.successLogin)


module.exports = router