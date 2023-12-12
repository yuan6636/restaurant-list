'use strict';
const bcrypt = require('bcryptjs')

const data = require('./restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction

    try {
      const hash = await bcrypt.hash('12345678', 10)
      
      transaction = await queryInterface.sequelize.transaction()

      const mappedData = data.map((item) => {
        item.createdAt = new Date()
        item.updatedAt = new Date()

        if(item.id <= 3) {
          item.userId = 1
        }else {
          item.userId = 2
        }
        return item
      })

      await queryInterface.bulkInsert('users', [
        {
          id: 1,
          name: 'user1',
          email: 'user1@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction })
      
      await queryInterface.bulkInsert('restaurants', mappedData, { transaction })

      await transaction.commit()
    } catch (error) {
      if (transaction) await transaction.rollback()
    }
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
