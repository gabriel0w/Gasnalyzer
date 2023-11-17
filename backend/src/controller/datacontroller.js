const DataService = require('../services/dataservice');

class DataController {

  // Método para adicionar dados
  async addData(req, res) {
    try {
      await DataService.saveData(req.body.unidade, req.body.fk_id_sensor, req.body.timestamp);
      res.status(201).send('Dado adicionado com sucesso.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Método para obter a média mensal por sensor
  async getMonthlyAverage(req, res) {
    try {
      const year = req.params.year;
      const monthlyAverages = await DataService.getMonthlyAverageBySensor(year);
      res.status(200).json(monthlyAverages);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Método para obter dados entre duas datas
  async getDataBetweenDates(req, res) {
    try {
      const { startDate, endDate } = req.params;
      const data = await DataService.getDataBetweenDates(startDate, endDate);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new DataController();
