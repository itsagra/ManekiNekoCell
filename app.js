const express = require('express')
const app = express()
const PORT = 3000
const routers = require('./routers')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded( { extended: false } ))

app.use('/', routers)

app.listen(PORT, () => {
    console.log(`app listening to http://localhost:${PORT}`)
})