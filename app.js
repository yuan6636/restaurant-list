const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const port = 3000

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
      equal: (a, b) => {
        return a === b
      }
    }
  })
)
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
}))
app.use(flash())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})