const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const router = require('./routes')
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
        secret: 'ThisIsSecret',
        resave: false,
        saveUninitialized: false
}))
app.use(flash())

app.use(router)

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})