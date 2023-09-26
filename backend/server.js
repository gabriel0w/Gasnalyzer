require("dotenv").config();
require("module-alias/register");

const config = require("@config");
const app = require("@app");
const MQTTService = require("./src/services/mqtt-service");

app.listen(config.app.port, () => {
  console.log(`Servidor rodando na porta ${config.app.port}`);
});

const mqttClient = new MQTTService();

mqttClient.connect();

mqttClient.subscribe("SENSOR_DATA");
