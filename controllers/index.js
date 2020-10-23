const { Buyer, Product, BuyerProduct } = require('../models')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')

class Controller {
    static homePage(req, res) {
        res.redirect('/products')
    }

    static showFormLogin(req, res) {
        req.session.isLogin = false
        res.render('login')
    }

    static successLogin(req, res) {
        let credential = {
            username: req.body.username,
            password: req.body.password
        }
        Buyer
        .findOne({
            where: {
                username: credential.username
                // password: credential.password
            }
        })
        .then( data => {
            // res.send(data.password)
            let hashPassword = data.password
            let compareResult = bcrypt.compareSync(credential.password, hashPassword)
            if(compareResult) {
                req.session.isLogin = true
                res.redirect('/products')
            } else {
                res.redirect('/login')
            }
        })
        .catch( err => {
            res.send(err)
        })
    }

    static showFormSignup(req, res) {
        res.render('signUp')
    }

    static saveFormSignup(req, res) {
        let dataBuyer = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            username: req.body.username,
            birth_date: req.body.birth_date,
            password: req.body.password
        }
        Buyer
        .create(dataBuyer)
        .then( data => {
            res.redirect('/login')
        })
        .catch( err => {
            res.send(err)
        })
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
        // res.render('cart')
        // console.log(req.body, 'ini di post')
        Product
        .findByPk(id)
        .then(data => {
            res.render('cart', { data })
        })
        .catch(err => {
            res.send(err)
        })

        
    }

    static addToCart(req, res) {
        const ProductId = +req.query.add
        let UserId
        // res.send(ProductId)
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