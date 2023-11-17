const SensorRepository = require('../repository/SensorRepository');

class SensorService {

  async addSensor(sensorData) {
    return await SensorRepository.createSensor(sensorData);
  }

  async removeSensor(sensorId) {
    return await SensorRepository.deleteSensor(sensorId);
  }

  async getSensorByFK(microId) {
    return await SensorRepository.getSensorsByMicrocontrollerId(microId);
  }
}

module.exports = new SensorService();
