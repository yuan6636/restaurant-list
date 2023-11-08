const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

const db = require('./models')
const Restaurant = db.Restaurant

app.get('/', (req, res) => {
    res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
    return Restaurant.findAll()
      .then((restaurants) => res.send({ restaurants }))
      .catch((err) => res.status(422).json(err))
})

app.get('/restaurants/new', (req, res) => {
    res.send('create new restaurant');
});

app.post('/restaurants', (req, res) => {
    res.send('add new restaurant');
});

app.get('/restaurant/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurants.find((dining) => dining.id.toString() === id)
    res.render('detail', { restaurant })
})

app.get('/restaurant/:id/edit', (req, res) => {
    const id = req.params.id
    res.send(`edit restaurant:${id}`)
})

app.put('/restaurant/:id', (req, res) => {
    res.send('modify restaurant detail')
})

app.delete('/restaurant/:id', (req, res) => {
    res.send('delete restaurant')
})

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})