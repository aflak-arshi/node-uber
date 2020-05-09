const historyController = require('../controllers/history');
const appConfig = require('../../config/appConfig');
const auth = require('../middlewares/auth');

module.exports.setRouter = app => {

    let baseUrl = `${appConfig.apiVersion}/history`;
    
    app.get(`${baseUrl}/:id`, auth, historyController.getHistory);

    app.get(`${baseUrl}/`, auth, historyController.getHistories);

};