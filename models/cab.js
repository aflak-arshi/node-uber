'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./user');

const Cabs = sequelize.define('Cab', {
    cabName: DataTypes.STRING,
    cabType: DataTypes.STRING,
    cabModel: DataTypes.STRING,
    cabLat: DataTypes.STRING,
    canLon: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    area: DataTypes.STRING,
    driverId: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});


Cabs.belongsTo(User, { foreignKey: 'driverId', targetKey: 'id' });


module.exports = Cabs;