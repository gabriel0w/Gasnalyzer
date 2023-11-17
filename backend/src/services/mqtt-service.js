const mqtt = require("mqtt");
const mqttConfig = require("../config/mqtt");
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

    this.client.on("connect", () => {
      console.log("Conexão MQTT estabelecida");
      this.client.subscribe("SENSOR_DATA");
    });

    this.client.on("close", () => {
      console.log("Conexão MQTT fechada");
      setTimeout(() => {
        console.log("Tentando reconectar...");
        this.connect();
      }, 5000);
    });

    this.client.on("error", (error) => {
      console.error("Erro na conexão MQTT:", error);
    });

    this.client.on("message", (topic, message) => {
      console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);
      if (topic === "SENSOR_DATA") {
        MessageHandler.handleSensorData(topic, message);
      }
    });
  }

  startPublishingRandomData() {
    if (this.publishingInterval) {
      return; // Já está publicando, então não faz nada
    }

    this.publishingInterval = setInterval(() => {
      const randomData = [
        (30.75 + Math.random() * 5).toFixed(2), // Valor próximo a 30.75
        (54.40 + Math.random() * 5).toFixed(2), // Valor próximo a 54.40
        (0.20 + Math.random() * 0.5).toFixed(2), // Valor próximo a 0.20
        (8.46 + Math.random() * 2).toFixed(2)  // Valor próximo a 8.46
      ].join(';');

      this.publish("SENSOR_DATA", randomData);
    }, 15000); // Gera e publica a cada 15 segundos
  }

  stopPublishingRandomData() {
    if (this.publishingInterval) {
      clearInterval(this.publishingInterval);
      this.publishingInterval = null;
    }
  }

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}

module.exports = MqttService;
