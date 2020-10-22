const express = require('express')
const session = require('express-session')
const route = require('./routes/route.js')
const app = express()
const port = 3000
const Controller = require('./controllers/controllers.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


function alert(req, res, next) {
    if(req.session.isLogin) {
        next()
    } else {
        res.redirect('/home')
    }
}



// app.get('/', (req, res) => {
//     res.render('signUp')
// })

// app.get('/loginPage', (req, res) => {
//     req.session.isLogin = true
//     res.send('You are logged in')
// })

// app.get('/home', (req, res) => {
//     res.send('masuk, tapi belum login')
// })

app.use('/', route)
app.listen(port, () => {
    console.log(`I Love You ${port}`)
})