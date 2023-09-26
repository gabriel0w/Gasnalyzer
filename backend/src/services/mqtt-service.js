const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt-config'); // Importe as configurações MQTT
const MessageHandler = require('./sensor-message-service');

class MqttService {
  constructor() {
    this.client = null;
  }

  connect() {
    const options = {
      clientId: mqttConfig.clientId,
      username: mqttConfig.username,
      password: mqttConfig.password,
    };

    this.client = mqtt.connect(mqttConfig.brokerUrl, options);

    // Evento de conexão bem-sucedida
    this.client.on('connect', () => {
      console.log('Conexão MQTT estabelecida');
      this.client.subscribe('SENSOR_DATA')
    });

    // Evento de desconexão
    this.client.on('close', () => {
      console.log('Conexão MQTT fechada');
    });

    // Evento de erro
    this.client.on('error', (error) => {
      console.error('Erro na conexão MQTT:', error);
    });

    // Evento de mensagem recebida
    this.client.on('message', (topic, message) => {
      console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);
      // Verifique se o tópico corresponde ao que você espera
      if (topic === 'SENSOR_DATA') {
        MessageHandler.handleSensorData()
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

  // Método para processar mensagens recebidas
  processReceivedMessage(message) {
    const parts = message.split(';');
    if (parts.length >= 2) {
      const timestamp = new Date().toISOString();
      const content = parts[0].trim();
    }
  }

  // Outros métodos para desconectar, etc., se necessário
}

module.exports = MqttService;
