let appConfig = {};

appConfig.port = process.env.PORT;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    DATABASE: process.env.DATABASE,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
    DIALECT: process.env.DIALECT
};
appConfig.apiVersion = process.env.API_VERSION;
  

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};