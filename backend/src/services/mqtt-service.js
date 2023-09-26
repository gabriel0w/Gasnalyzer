const mqtt = require("mqtt");
const mqttConfig = require("../config/mqtt"); // Importe as configurações MQTT
const MessageHandler = require("./sensor-message-service");

class MqttService {
  constructor() {
    this.client = null;
  }

  connect() {
    const options = {
      host: mqttConfig.host,
      port: mqttConfig.port,
      protocol: mqttConfig.protocol,
      username: mqttConfig.username,
      password: mqttConfig.password,
    };

    this.client = mqtt.connect(options);

    // Evento de conexão bem-sucedida
    this.client.on("connect", () => {
      console.log("Conexão MQTT estabelecida");
      this.client.subscribe("SENSOR_DATA");
    });

    // Evento de desconexão
    this.client.on("close", () => {
      console.log("Conexão MQTT fechada");

      // Tentar reconectar após um atraso (por exemplo, 5 segundos)
      setTimeout(() => {
        console.log("Tentando reconectar...");
        this.connect(); // Tente reconectar
      }, 5000); // Ajuste o tempo de atraso conforme necessário
    });

    // Evento de erro
    this.client.on("error", (error) => {
      console.error("Erro na conexão MQTT:", error);
    });

    // Evento de mensagem recebida
    this.client.on("message", (topic, message) => {
      console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);
      // Verifique se o tópico corresponde ao que você espera
      if (topic === "SENSOR_DATA") {
        MessageHandler.handleSensorData();
      }
    });
  }

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  // Método para publicar mensagens
  publish(topic, message) {
    this.client.publish(topic, message);
  }

  // Outros métodos para desconectar, etc., se necessário
}

module.exports = MqttService;
