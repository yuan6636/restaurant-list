const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


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

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      attributes: ['id', 'name', 'category', 'location', 'phone', 'description', 'image', 'google_map'],
      raw: true
    })
      .then((restaurant) => res.render('detail', { restaurant }))
      .catch((err) => console.log(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      raw: true
    })
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch((err) => console.log(err))
})

app.put('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log(body)
    return Restaurant.update({
      name: body.name,
      name_en: body.name_en,
      category: body.category,
      image: body.image,
      location: body.location,
      phone: body.phone,
      google_map: body.google_map,
      rating: body.rating,
      description: body.description
    }, { where: { id } })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch((err) => console.log(err))
})

app.delete('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.destroy({ where: { id } })
      .then(() => res.redirect('/restaurants'))
      .catch((err) => console.log(err))
})

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})