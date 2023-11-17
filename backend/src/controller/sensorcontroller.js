const SensorService = require('../services/sensorservice');

class SensorController {

  async addSensor(req, res) {
    try {
      const sensor = await SensorService.addSensor(req.body);
      res.status(201).json(sensor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeSensor(req, res) {
    try {
      const { sensorId } = req.params;
      await SensorService.removeSensor(sensorId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSensorsByMicrocontroller(req, res) {
    try {
      const microcontrollerId  = req.params.sensorId;
      const sensors = await SensorService.getSensorByFK(microcontrollerId);
      if (sensors && sensors.length > 0) {
        res.status(200).json(sensors);
      } else {
        res.status(404).json({ message: 'Nenhum sensor encontrado para este microcontrolador.' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


}

module.exports = new SensorController();
