const History = require('../../models/history');

module.exports.getHistories = async (req, res) => {
  try {
    const histories = await History.findAll({
      where: req.loggedInUser.userId,
    });
    if (histories.length === 0) {
      return res.status(404).send({
        message: 'No cab history found.',
      });
    }
    res.status(200).send(histories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.getHistory = async (req, res) => {
  try {
    const { id } = req.params.id;
    const history = await History.findBtPk(id);
    if (!history) {
      return res.status(404).send({
        message: `No cab history exists for this ${id}`,
      });
    }
    re.status(200).send(history);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
