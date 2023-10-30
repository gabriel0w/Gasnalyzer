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

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}

module.exports = MqttService;
