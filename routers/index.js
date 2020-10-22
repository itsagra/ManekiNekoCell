const router = require('express').Router()
const Controller = require('../controllers')
const products = require('./products')
const cart = require('./cart')


router.get('/', Controller.homePage)
router.use('/products', products)
router.use('/cart', cart)


module.exports = router