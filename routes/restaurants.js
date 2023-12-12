const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
       const page = parseInt(req.query.page) || 1
       const limit = 9
       const keyword = req.query.keyword
       const userId = req.user.id
       let sort = req.query.sort
       let where = { userId }

       if(keyword) {
         where = {
           userId,
           [Op.or]: [
              { name: { [Op.substring]: keyword }},
              { category: { [Op.substring]: keyword }}
           ]
         }
       }
       
       function orderMethod(sort) {
          switch (sort) {
            case '1':
              return ['name']
            case '2':
              return ['name', 'DESC']
            case '3':
              return ['category', 'DESC']
            case '4':
              return ['location']
            default:
              return ['id']
         }
       }

       return Restaurant.findAll({
              attributes: ['id', 'name', 'category', 'image', 'rating'],
              where,
              order: [[...orderMethod(sort)]],
              offset: (page - 1) * limit,
              limit,
              raw: true
       })
              .then((restaurants) => {
                    res.render('index', {
                      restaurants,
                      keyword,
                      prev: page > 1 ? page - 1 : page,
                      next: page + 1,
                      page,
                      sort
                    })
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
      const userId =req.user.id

      return Restaurant.create({ ...body, userId })
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
      const userId = req.user.id

      return Restaurant.findByPk(id, {
              attributes: [
                'id',
                'name',
                'category',
                'location',
                'phone',
                'description',
                'image',
                'google_map',
                'userId'
              ],
              raw: true
      })
              .then((restaurant) => {
                    if (!restaurant) {
                        req.flash('error', '找不到資料')
                        return res.redirect('/restaurants')
                    }
                    if(restaurant.userId !== userId) {
                        req.flash('error', '權限不足')
                        return res.redirect('/restaurants')
                    }
                    res.render('detail', { restaurant })
              })
              .catch((error) => {
                      error.errorMessage = '資料取得失敗:('
                      next(error)
              })
})

router.get('/:id/edit', (req, res, next) => {
      const id = req.params.id
      const userId = req.user.id

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
                'description',
                'userId'
              ],
              raw: true
      })
            .then((restaurant) => {
                    if (!restaurant) {
                        req.flash('error', '找不到資料')
                        return res.redirect('/restaurants')
                    }
                    if(restaurant.userId !== userId) {
                        req.flash('error', '權限不足')
                        return res.redirect('/restaurants')
                    }
                    res.render('edit', { restaurant })
            } )
            .catch((error) => {
                    error.errorMessage = '資料取得失敗:('
                    next(error)
            })
})

router.put('/:id', (req, res, next) => {
      const id = req.params.id
      const body = req.body
      const userId = req.user.id

      return Restaurant.findByPk(id, {
              attributes: [
                'id',
                'name',
                'category',
                'location',
                'phone',
                'description',
                'image',
                'google_map',
                'userId'
              ]
      })
              .then((restaurant) => {
                    if (!restaurant) {
                        req.flash('error', '找不到資料')
                        return res.redirect('/restaurants')
                    }
                    if(restaurant.userId !== userId) {
                        req.flash('error', '權限不足')
                        return res.redirect('/restaurants')
                    }
                    return restaurant.update(
                                {
                                  name: body.name,
                                  name_en: body.name_en,
                                  category: body.category,
                                  image: body.image,
                                  location: body.location,
                                  phone: body.phone,
                                  google_map: body.google_map,
                                  rating: body.rating,
                                  description: body.description,
                                }
                            )
                                .then(() => {
                                      req.flash('success', '更新成功!')
                                      return res.redirect(`/restaurants/${id}`)
                                })
              })
              .catch((error) => {
                      error.errorMessage = '更新失敗:('
                      next(error)
              })
})

router.delete('/:id', (req, res, next) => {
      const id = req.params.id
      const userId = req.user.id

      return Restaurant.findByPk(id, {
              attributes: [
                'id',
                'name',
                'category',
                'location',
                'phone',
                'description',
                'image',
                'google_map',
                'userId'
              ]
      })
              .then((restaurant) => {
                    if (!restaurant) {
                        req.flash('error', '找不到資料')
                        return res.redirect('/restaurants')
                    }
                    if (restaurant.userId !== userId) {
                        req.flash('error', '權限不足')
                        return res.redirect('/restaurants')
                    }
                    return restaurant.destroy({ where: { id } })
                            .then(() => {
                                  req.flash('success', '刪除成功!')
                                  return res.redirect('/restaurants')
                            })
              })

              .catch((error) => {
                      error.errorMessage = '刪除失敗:('
                      next(error)
              })
})

module.exports = router