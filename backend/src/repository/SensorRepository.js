const Sensor = require("../models/Sensor");

class SensorRepository {

  async createSensor(sensorData) {
    try {
      return await Sensor.create(sensorData);
    } catch (error) {
      console.error("Erro ao criar sensor:", error);
      throw error;
    }
  }

    async deleteSensor(sensorId) {
      try {
        return Sensor.destroy({
          where: { id_sensor: sensorId }
        });
      } catch (error) {
        console.error("Erro ao deletar sensor:", error);
        throw error;
      }
    }

    async getSensorsByMicrocontrollerId(microcontrollerId) {
      try {
        return await Sensor.findAll({
          where: { fk_id_microcontrolador: microcontrollerId }
        });
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
        throw error;
      }
    }
  }

  module.exports = new SensorRepository();
