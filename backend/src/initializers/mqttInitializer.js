const MQTTService = require('../services/mqtt-service');

const mqttClient = new MQTTService();

mqttClient.connect();
mqttClient.subscribe("SENSOR_DATA");

module.exports = mqttClient;
