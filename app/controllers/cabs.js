const { Op } = require('sequelize');
const Cab = require('../../models/cab');
const History = require('../../models/history');
const User = require('../../models/user');

module.exports.createCab = async (req, res) => {
  try {
    const cabObject = Cab.build(req.body);
    await Cab.create(cabObject.dataValues);
    res.status(200).send({
      message: 'Cab created successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.updateCab = async (req, res) => {
  try {
    const { id } = req.params;
    await Cab.update(req.body, {
      where: {
        id
      },
    });
    res.status(200).send({
      message: 'Updated created successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.deleteCab = async (req, res) => {
  try {
    const { id } = req.params;

    await Cab.update(
      { status: false },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send({
      message: 'Cab deleted successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.getCab = async (req, res) => {
  try {
    const { id } = req.params;
    const cab = await Cab.findAll({
        limit: 1,
        where: {
            id,
            status: true
        }
    });
    if (!cab.length > 0) {
      return res.status(404).send({
        message: `No cab exists for this ${id}`,
      });
    }
    res.status(200).send(cab);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.getCabsByLocation = async (req, res) => {
  try {
    const { from, to } = req.body;
    const cab = await Cab.findAll({
      where: { area: { [Op.iLike]: from }, status: true },
    });
    if (cab.length === 0) {
      return res.status(200).send({
        message: 'No cab found, pleas try again.',
      });
    }
    const price = Math.floor(Math.random() * 6) + 1;
    const historyObject = History.build({
      from,
      to,
      price,
      userId: req.loggedInUser.userId,
    });
    await History.create(historyObject.dataValues);
    res.status(200).send(cab);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.getCabs = async (req, res) => {
  try {
    const { page, pageSize, searchKey } = req.query;
    const offset = (+page || 0) * (+pageSize || 10);
    const limit = pageSize || 10;

    const cabs = await Cab.findAndCountAll({
      where: { status: true },
      offset,
      limit,
    });
    res.status(200).send(cabs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
