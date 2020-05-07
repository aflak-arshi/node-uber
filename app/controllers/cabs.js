const { Op } = require('sequelize');
const Cabs = require('../../models/cab');
const History = require('../../models/history');

module.exports.createCab = async (req, res) => {
    try {
        const cabObject = Cabs.build(req.body);
        await ABPInventoryItem.create(cabObject);
        res.status(200).send({
            message: 'Cab created successfully.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.updateCab = async (req, res) => {
    try {
        const { id } = req.params;
        await ABPInventoryItem.update(cabObject, { where: {
            id
        }});
        res.status(200).send({
            message: 'Updated created successfully.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.deleteCab = async (req, res) => {
    try {

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.getCab = async (req, res) => {
    try {

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.getCabsByLocation = async (req, res) => {
    try {
        const { from, to } = req.body;
        const cab = await
         Cabs.findAll({
            where: { area: { [Op.iLike]: from } }
        });
        if (cab.length === 0) {
            return res.status(200).send({
                message: 'No cab found, pleas try again.'
            });
        }
        const price = Math.floor(Math.random() * 6) + 1;
        const historyObject = History.build({
            from,
            to,
            price
        });
        await History.create(historyObject.dataValues);
        res.status(200).send(cab);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports.getCabs = async (req, res) => {
    try {
        const { page, pageSize, searchKey } = req.query;
        const offset = (+page || 0) * (+pageSize || 10);
        const limit = pageSize;
        
        const cabs = await Cabs.findAndCountAll({ offset, limit });
        res.status(200).send(cabs);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
};
 
// module.exports.confirmCab = async (req, res) => {
//     try {
//         const { confirm, id } = req.body;

//         await 
//     } catch(error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// }