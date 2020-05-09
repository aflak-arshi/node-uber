const cabsController = require('../controllers/cabs');
const appConfig = require('../../config/appConfig');
const auth = require('../middlewares/auth');

module.exports.setRouter = app => {
    
    let baseUrl = `${appConfig.apiVersion}/cabs`;

    app.post(`${baseUrl}/get-cabs`, auth, cabsController.getCabsByLocation);

    app.post(`${baseUrl}/`, auth, cabsController.createCab);

    app.patch(`${baseUrl}/:id`, auth, cabsController.updateCab);

    app.delete(`${baseUrl}/:id`, auth, cabsController.deleteCab);

    app.get(`${baseUrl}/:id`, auth, cabsController.getCab);

    app.get(`${baseUrl}/`, auth, cabsController.getCabs);

};