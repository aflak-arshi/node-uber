'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./user');
const Cab = require('./cab');

const History = sequelize.define(
  'History',
  {
    price: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cabId: DataTypes.INTEGER
  },
  {}
);

History.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
History.belongsTo(Cab, { foreignKey: 'cabId', targetKey: 'id' });

module.exports = History;
