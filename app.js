const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
const Restaurant = db.Restaurant

app.get('/', (req, res) => {
    res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
    return Restaurant
      .findAll({
        attributes: ['id', 'name', 'category', 'image', 'rating'],
        raw: true
      })
      .then((restaurants) => {
        const keyword = req.query.keyword
        const filteredRestaurants = keyword ? restaurants.filter((dining) => 
          // 透過 Object.values()方法，可以過濾 objective 內所有 key 值，增加搜尋範圍
          Object.values(dining).some((property) => {
            if (typeof property === "string") {
              // 針對 keyword 刪減頭尾的空白
              return property.toLowerCase().includes(keyword.toLowerCase().trim())
            }
            return false
          })
        ) : restaurants
        res.render('index', { restaurants: filteredRestaurants, keyword })
      })
      .catch((err) => res.status(422).json(err))
})

app.get('/restaurants/new', (req, res) => {
    return res.render('new')
});

app.post('/restaurants', (req, res) => {
    const body = req.body
    return Restaurant.create(body)
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
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