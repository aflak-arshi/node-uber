const userController = require('../controllers/user');
const appConfig = require('../../config/appConfig');
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {
    
    let baseUrl = `${appConfig.apiVersion}/users`;
    console.log(baseUrl)

    app.post(`${baseUrl}/`, userController.signupUser);

    app.post(`${baseUrl}/login`, userController.loginUser);

    app.patch(`${baseUrl}/:id`, auth, userController.updateUser);

    app.delete(`${baseUrl}/:id`, auth, userController.deleteUser);

    app.get(`${baseUrl}/:id`, auth, userController.getUser);

    app.get(`${baseUrl}/`, auth, userController.getUsers);

};