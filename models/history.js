'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const History = sequelize.define(
  'History',
  {
    price: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
  },
  {}
);
History.associate = function (models) {
  History.belongsTo(models.User);
  History.belongsTo(models.Cab);
};

module.exports = History;
