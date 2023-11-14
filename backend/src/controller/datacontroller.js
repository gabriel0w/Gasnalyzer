const DataRepository = require('../repository/DataRepository');
const { Dado } = require("../models/Dado");
const { Sensor } = require("../models/Sensor");
const { MicroControlador } = require("../models/MicroControlador");

class dataController {
  static async getDataBefore(req, res) {
    try {
      const date = new Date(req.params.date);
      const repository = new DataRepository(Dado, Sensor, MicroControlador);

      const data = await repository.getDataBeforeDate(date);
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = dataController;
