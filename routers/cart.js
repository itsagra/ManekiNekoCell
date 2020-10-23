const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.showCart)
router.post('/add/:id', Controller.addToCart)
router.get('/delete/:id', Controller.deleteItem)

module.exports = router