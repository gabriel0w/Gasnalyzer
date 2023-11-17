const DataService = require('../services/dataservice');
const io = require('./containerservice').resolve('io');

const SENSOR_IDS = {
  temperatura: 1,
  umidade: 3,
  gasInflamavel: 4,
  monoxidoDeCarbono: 2,
};

class MessageHandler {
  static async handleSensorData(topic, message) {
    console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);

    try {
      const messageContent = message.toString();
      const parts = messageContent.split(";");

      if (parts.length >= 4) {
        const timestamp = new Date().toISOString();

        const sensorData = [
          { id: SENSOR_IDS.temperatura, value: parseFloat(parts[0]) },
          { id: SENSOR_IDS.umidade, value: parseFloat(parts[1]) },
          { id: SENSOR_IDS.gasInflamavel, value: parseFloat(parts[2]) },
          { id: SENSOR_IDS.monoxidoDeCarbono, value: parseFloat(parts[3]) },
        ];

        for (const data of sensorData) {
          await DataService.saveData(data.value, data.id, timestamp);
        }

        io.emit('newData', sensorData);
        console.log("Dados salvos no banco de dados e emitidos via WebSocket com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao lidar com a mensagem:", error.message);
    }
  }
}


module.exports = MessageHandler;
