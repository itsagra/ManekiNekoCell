const { Buyer, Product, BuyerProduct } = require('../models')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')
const Helper = require('../helper/helper')


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
        Buyer.findOne({
            where: {
                isLogin: true
            },
            include: Product
        })
        .then(data => {
            res.render('cart', { data, Product, Helper })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addToCartDb(req, res) {
        const id = +req.params.id
        console.log(req.body, 'ini di post')

        
    }

    static addToCart(req, res) {
        const ProductId = +req.params.id
        let BuyerId
        Buyer.findOne({
            where: {
                isLogin: true
            }
        })
        .then(data => {
            BuyerId = data.id
            BuyerProduct.create({
                ProductId, BuyerId
            })
            .then(() => {
                res.redirect('/cart')
            })
            .catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showForm(req, res) {
        console.log(req)
        res.render('signUp')
    }
    static saveForm(req, res) {
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
    static showFormLogin(req, res) {
        res.render('login')
    }

    static successLogin(req, res) {
        let credential = {
            username: req.body.username,
            password: req.body.password
        }
        Buyer.update({isLogin: true}, {
            where: {
                username: credential.username
            }
        })
        .then( data => {
            Buyer.findOne({
                where: {
                    username: credential.username
                }
            })
            .then(success => {
                // res.send(data)
                console.log(success)
                let hashPassword = success.password
                let compareResult = bcrypt.compareSync(credential.password, hashPassword)
                if(compareResult) {
                    res.send('Berhasil login') // di arahkan ke list product
                } else {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch( err => {
            console.log(err)
        })
    }

    static deleteItem(req, res) {
        const id = +req.params.id
        BuyerProduct.destroy({
            where: {
                ProductId: id
            },
            limit: 1
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static sendMail(req, res) {
        
    }
}

module.exports = Controller