const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
      return Restaurant.findAll({
              attributes: ['id', 'name', 'category', 'image', 'rating'],
              raw: true
      })
              .then((restaurants) => {
                      const keyword = req.query.keyword
                      const filteredRestaurants = keyword ? restaurants.filter((dining) => {
                      // 直接針對需要的值比對keyword，就不用比對object所有的值，增加效能
                        const name = dining.name
                        const category = dining.category
                        return [name, category].some((value) => value.toLowerCase().includes(keyword.toLowerCase().trim()))
                      }) 
                      : restaurants
                      res.render('index', { restaurants: filteredRestaurants, keyword })
              })
              .catch((error) => {
                      error.errorMessage = '資料取得失敗:('
                      next(error)
              })
})

router.get('/new', (req, res) => {
      return res.render('new')   
})

router.post('/', (req, res, next) => {
      const body = req.body
      return Restaurant.create(body)
              .then(() => {
                    req.flash('success', '新增成功!')
                    return res.redirect('/restaurants')
              })
              .catch((error) => {
                      error.errorMessage = '新增失敗:('
                      next(error)
              })
})

router.get('/:id', (req, res, next) => {
      const id = req.params.id
      return Restaurant.findByPk(id, {
              attributes: [
                'id',
                'name',
                'category',
                'location',
                'phone',
                'description',
                'image',
                'google_map'
              ],
              raw: true
      })
              .then((restaurant) => res.render('detail', { restaurant }))
              .catch((error) => {
                      error.errorMessage = '資料取得失敗:('
                      next(error)
              })
})

router.get('/:id/edit', (req, res, next) => {
      const id = req.params.id
      return Restaurant.findByPk(id, {
              attributes: [
                'id',
                'name',
                'name_en',
                'category',
                'image',
                'location',
                'phone',
                'google_map',
                'rating',
                'description'
              ],
              raw: true
      })
            .then((restaurant) => res.render('edit', { restaurant }) )
            .catch((error) => {
                    error.errorMessage = '資料取得失敗:('
                    next(error)
            })
})

router.put('/:id', (req, res, next) => {
      const id = req.params.id
      const body = req.body
      console.log(body)
      return Restaurant.update(
            {
              name: body.name,
              name_en: body.name_en,
              category: body.category,
              image: body.image,
              location: body.location,
              phone: body.phone,
              google_map: body.google_map,
              rating: body.rating,
              description: body.description
            },
            { where: { id } }
      )
            .then(() => {
                  req.flash('success', '更新成功!')
                  return res.redirect(`/restaurants/${id}`)
            })
            .catch((error) => {
                    error.errorMessage = '更新失敗:('
                    next(error)
            })
})

router.delete('/:id', (req, res, next) => {
      const id = req.params.id
      return Restaurant.destroy({ where: { id } })
              .then(() => {
                    req.flash('success', '刪除成功!')
                    return res.redirect('/restaurants')
              })
              .catch((error) => {
                      error.errorMessage = '刪除失敗:('
                      next(error)
              })
})

module.exports = router