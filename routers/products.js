const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.showAllProducts)
router.get('/:brand', Controller.showAllProductsBybrand)
router.get('/:brand/:id', Controller.showProductsById)


module.exports = router