const express = require('express')
const app = express()
const session = require('express-session')
const PORT = 3000
const routers = require('./routers')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded( { extended: false } ))
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



app.use('/', routers)

app.listen(PORT, () => {
    console.log(`app listening to http://localhost:${PORT}`)
})