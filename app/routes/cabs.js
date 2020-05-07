const cabsController = require('../controllers/cabs');
const appConfig = require('../../config/appConfig');

module.exports.setRouter = app => {
    
    let baseUrl = `${appConfig.apiVersion}/cabs`;

    app.post(`${baseUrl}/get-cabs`, cabsController.getCabsByLocation);

    app.post(`${baseUrl}/`, cabsController.createCab);

    app.patch(`${baseUrl}/:id`, cabsController.updateCab);

    app.delete(`${baseUrl}/:id`, cabsController.deleteCab);

    app.get(`${baseUrl}/:id`, cabsController.getCab);

    app.get(`${baseUrl}/`, cabsController.getCabs);

};