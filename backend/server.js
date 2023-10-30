require("dotenv").config();
require("module-alias/register");

require("./src/initializers/expressInitializer");  // Inicialização do Express
const io = require("./src/initializers/socketInitializer");   // Inicialização do Socket.io

const containerService = require('./src/services/containerservice');
containerService.registerDependency('io', io);

require("./src/initializers/mqttInitializer");     // Inicialização do MQTT
