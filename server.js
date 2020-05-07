require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const http = require('http');
const app = express();
const appConfig = require('./config/appConfig');
const logger = require('./app/libs/loggerLib');
const routeLoggerMiddleware = require('./app/middlewares/routeLogger.js');
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(morgan('dev'));

// Request body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const modelsPath = './app/models';
const controllersPath = './app/controllers';
const libsPath = './app/libs';
const middlewaresPath = './app/middlewares';
const routesPath = './app/routes';

  
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     next();
// });

// // Bootstrap models
// fs.readdirSync(modelsPath).forEach(function (file) {
//     if (~file.indexOf('.js')) require(modelsPath + '/' + file);
// });

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

// calling global 404 handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler);


/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// require('./config/dbConfig');
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10);
        throw error;
    }


    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
        case 'EADDRINUSE':
        logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
        default:
        logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
        throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind);
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
}
  
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

function addApiKeyAuthorization() {
	// var key = encodeURIComponent($('#input_apiKey')[0].value);
	// if (key && key.trim() != "") {
	// 	var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("Authorization", "Bearer " + key, "header");
	// 	window.swaggerUi.api.clientAuthorizations.add("bearer", apiKeyAuth);
	// 	log("added key " + key);
	// }
}
  
module.exports = app;