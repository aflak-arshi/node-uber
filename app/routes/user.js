const userController = require('../controllers/user');
const appConfig = require('../../config/appConfig');
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {
    
    let baseUrl = `${appConfig.apiVersion}/users`;
    console.log(baseUrl)

    app.post(`${baseUrl}/`, userController.signupUser);

    app.post(`${baseUrl}/login`, userController.loginUser);

    app.patch(`${baseUrl}/:id`, userController.updateUser);

    app.delete(`${baseUrl}/:id`, userController.deleteUser);

    app.get(`${baseUrl}/:id`, userController.getUser);

    app.get(`${baseUrl}/`, auth, userController.getUsers);

};