const route = require('express').Router()
const Controller = require('../controllers/controllers.js')
route.get('/signUp', Controller.showForm)
route.post('/signUp', Controller.saveForm)
route.get('/login', Controller.showFormLogin)
route.post('/login', Controller.successLogin)
module.exports = route