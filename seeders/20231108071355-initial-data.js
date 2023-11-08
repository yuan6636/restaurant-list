'use strict';

const data = require('./restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mappedData = data.map((item) => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
      return item
    })
    await queryInterface.bulkInsert('restaurants', mappedData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null)
  }
};
