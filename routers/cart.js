const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.showCart)
router.post('/', Controller.addToCart)
router.post('/add/:id', Controller.addToCartDb)

module.exports = router