require("dotenv").config();
require("module-alias/register");

const cronJobs = require("./src/jobs/cronJobs") // inicialização do cron
cronJobs.startAll();

const io = require("./src/initializers/socketInitializer");   // Inicialização do Socket.io

const containerService = require('./src/services/containerservice');
containerService.registerDependency('io', io);

const mqtt = require("./src/initializers/mqttInitializer");     // Inicialização do MQTT
containerService.registerDependency('mqttClient', mqtt);

const app = require("./src/app");  // Inicialização do app

