const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
    const keyword = req.query.keyword
    const filteredRestaurants = keyword ? restaurants.filter((dining) => 
      // 透過 Object.value()方法，可以過濾 objective 內所有 key 值，增加搜尋範圍
      Object.values(dining).some((property) => {
        if(typeof property === 'string') {
          // 針對 keyword 刪減頭尾的空白
          return property.toLowerCase().includes(keyword.toLowerCase().trim())
        }
        return false
      })
    ) : restaurants
    res.render('index', { restaurants: filteredRestaurants, keyword })
})

app.get("/restaurants/new", (req, res) => {
  res.send("create new restaurant");
});

app.post("/restaurants", (req, res) => {
  res.send("add new restaurant");
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