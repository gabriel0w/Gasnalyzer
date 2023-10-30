const { Dado } = require("../models/Dado");
const { MicroControlador } = require("../models/MicroControlador");
const { Sensor } = require("../models/Sensor");
const SensorRepository = require('../repository/SensorRepository');
const io = require('./containerservice').resolve('io');

class MessageHandler {
  static async handleSensorData(topic, message) {
    console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);

    try {
      const messageContent = message.toString();
      const parts = messageContent.split(";");

      if (parts.length >= 4) {
        const timestamp = new Date().toISOString();
        const repository = new SensorRepository(Dado, Sensor, MicroControlador); // Adicione outros modelos conforme necessário
        const data = await repository.saveData(parts, timestamp);

        io.emit('newData', data);
        console.log("Mensagem salva no banco de dados e emitida via WebSocket com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao lidar com a mensagem:", error.message);
    }
  }
}

module.exports = MessageHandler;
