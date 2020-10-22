const { Buyer, Product} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
    static showForm(req, res) {
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
                res.send('Berhasil login') // di arahkan ke list product
            } else {
                res.redirect('/login')
            }
        })
        .catch( err => {
            res.send(err)
        })
    }
}
module.exports = Controller