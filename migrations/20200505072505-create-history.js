'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      price: Sequelize.STRING,
      from: Sequelize.STRING,
      to: Sequelize.STRING,
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
      },
      cabId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Cabs',
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
    return queryInterface.dropTable('Histories');
  }
};