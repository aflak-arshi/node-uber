'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cabName: Sequelize.STRING,
      cabName: Sequelize.STRING,
      cabType: Sequelize.STRING,
      cabModel: Sequelize.STRING,
      cabLat: Sequelize.STRING,
      canLon: Sequelize.STRING,
      country: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      area: Sequelize.STRING,
      userId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cabs');
  }
};