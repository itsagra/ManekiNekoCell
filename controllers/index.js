const { Buyer, Product, BuyerProduct } = require('../models')
const { Op } = require("sequelize")


class Controller {
    static homePage(req, res) {

    }

    static showAllProducts(req, res) {
        Product.findAll({
            where: {
                stock: {
                    [Op.gt]: 0
                }
            }
        })
        .then(data => {
            // res.send(data)
            res.render('indexproduct', { data, Product })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showAllProductsBybrand(req, res) {
        const brand = req.params.brand
        Product.findAll({
            where: {
                brand,
                stock: {
                    [Op.gt]: 0
                }
            }
        })
        .then(data => {
            res.render('indexproduct', { data, Product })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showProductsById(req, res) {
        const brand = req.params.merk
        const id = +req.params.id
        // const product_name = req.params.product_name
        Product.findOne({
            where: {
                id,
                stock: {
                    [Op.gt]: 0
                }
            }
        })
        .then(data => {
            res.render('showproduct', { data, Product })
        })
        .catch(err => {
            res.send(err)
        })

    }

    static showCart(req, res) {
        // const id = req.body
        // Buyer.findOne(id, {
        //     include: Product
        // })
        // .then(data => {
        //     res.render('cart', { data })
        // })
        // .catch(err => {
        //     res.send(err)
        // })
        res.render('cart')
    }

    static addToCartDb(req, res) {
        const id = +req.params.id
        console.log(req.body, 'ini di post')

        
    }

    static addToCart(req, res) {
        const ProductId = +req.query.add
        let UserId
        BuyerProduct.create(ProductId)
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller