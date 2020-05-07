const Sequelize = require('sequelize');
const appConfig = require('../config/appConfig');

const sequelize = new Sequelize(appConfig.db.DATABASE, appConfig.db.DIALECT, appConfig.db.PASSWORD, {
    host: appConfig.db.HOST,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(db => {
        console.log(`Connection has been established successfully.`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;