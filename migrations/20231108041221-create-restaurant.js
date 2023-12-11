'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      name_en: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      phone: {
        allowNull: false,
        type: Sequelize.CHAR(15)
      },
      google_map: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.DECIMAL(2, 1).UNSIGNED
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurants');
  }
};