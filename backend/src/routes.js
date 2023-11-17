const router = require('express').Router();
const TestController = require('@controller/test.js');
const authController = require('./controller/authcontroller');
const UserController = require('./controller/userController');
const DataController = require('./controller/datacontroller');
const microController = require('./controller/microcontroller');
const sensorController = require('./controller/sensorcontroller');
const authService = require('./services/authservice');
const containerService = require('./services/containerservice');




router.get('/', TestController.helloworld);

// Rota de registro
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

// Rota para solicitar redefinição de senha
router.post('/request-reset-password', authController.requestResetPassword);

// Rota para redefinir senha
router.post('/reset-password', authController.resetPassword);

router.post('/users', UserController.createUser);

router.get('/microcontroladores', authService, microController.getMicrocontrollers);
router.get('/microcontroladores/:microcontrollerId/sensores', authService, microController.getSensorsByMicrocontroller);
router.post('/microcontroladores/create', authService, microController.createMicrocontroller);
router.delete('/microcontroladores/:microcontrollerId', authService, microController.deleteMicrocontroller);

router.post('/sensores', authService , sensorController.addSensor);
router.delete('/sensores/delete/:sensorId', authService , sensorController.removeSensor);
router.get('/sensores/get-sensor-by-fk/:sensorId', authService , sensorController.getSensorsByMicrocontroller);

router.post('/data', authService , DataController.addData);
router.get('/data/monthly-average/:year', authService , DataController.getMonthlyAverage);
router.get('/data/between-dates/:startDate/:endDate', authService, DataController.getDataBetweenDates);

const mqttClient = containerService.resolve('mqttClient');
router.get('/start-publishing', (req, res) => {
    const { publish } = req.query;

    if (publish === 'true') {
        mqttClient.startPublishingRandomData();
      res.send("Publicação de dados iniciada.");
    } else {
        mqttClient.stopPublishingRandomData();
      res.send("Publicação de dados parada.");
    }
  });

router.get('/authenticate', authService, (req, res) => {
    res.status(200).json({ message: 'Autenticado com sucesso' });
  });

module.exports = router;
