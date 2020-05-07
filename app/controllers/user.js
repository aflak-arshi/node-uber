const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports.signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRes = await User.findAll({
            limit: 1,
            where: {
                email
            }
        });
        if (userRes.length > 0) {
            res.send({
                status: false,
                message: "User already exists."
            });
        }
        else { 
            const hash = await bcrypt.hash(password, 8);
            const userObject = User.build({
                ...req.body,
                password: hash
            });
            await User.create(userObject.dataValues);
            res.status(200).send({ message: 'User created successfully.'});
        }
    } catch(error) {
        console.log(error);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRes = await User.findAll({
            limit: 1,
            where: {
                email
            }
        });
        if (!userRes.length > 0) {
            res.statusMessage = "User not found.";
            res.status(404).send({
                message: "User not found."
            });
        } else {
            let isMatch = await bcrypt.compare(password, userRes[0].password);
            if(!isMatch) {
                res.status(500).send({
                    message: "Unable to login."
                });
            }
            if (isMatch) {
                const token = jwt.sign({
                    email: userRes[0].email,
                    userId: userRes[0].id
                }, process.env.JWT_SECRET, {
                    expiresIn: "8h"
                });
                res.status(200).send({
                    message: 'Successfully login!',
                    token: token
                });
            }
        }
    } catch(error) {
        console.log(error);
    }
}

module.exports.getUsers = async (req, res) => {
    try { 
        console.log("===========================", req.loggedInUser)
        const { page, pageSize, searchKey } = req.query;
        const offset = (+page || 0) * (+pageSize || 10);
        const limit = pageSize;
        
        const users = await User.findAndCountAll({ offset, limit });
        res.status(200).send(users);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
    }
};

module.exports.updateUser = async (req, res) => {
    try {

    } catch(error) {
        console.log(error);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {

    } catch(error) {
        console.log(error);
    }
};

module.exports.loggedInUser = async (req, res) => {
    try {

    } catch(error) {
        console.log(error);
    }
};
