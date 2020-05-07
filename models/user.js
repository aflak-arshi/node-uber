const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    accountStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = User;