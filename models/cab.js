'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Cabs = sequelize.define('Cab', {
    cabName: DataTypes.STRING,
    cabType: DataTypes.STRING,
    cabModel: DataTypes.STRING,
    cabLat: DataTypes.STRING,
    canLon: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    area: DataTypes.STRING
  }, {});
  Cabs.associate = function(models) {
    Order.belongsTo(models.User);
  };

module.exports = Cabs;