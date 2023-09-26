const { Dado } = require("../models/Dado"); // Importe o modelo do banco de dados (ajuste o caminho conforme necessário)

class MessageHandler {
  static async handleSensorData(topic, message) {
    console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);

    try {
      const messageContent = message.toString();
      const parts = messageContent.split(";");

      if (parts.length >= 4) {
        const timestamp = new Date().toISOString();

        // Salvar a mensagem no banco de dados
      }
      console.log("Mensagem salva no banco de dados com sucesso.");
    } catch (error) {
      console.error("Erro ao lidar com a mensagem:", error);
    }
  }
}

module.exports = MessageHandler;
