const router = require('express').Router();
const TestController = require('@controller/test.js');
const authController = require('./controller/authcontroller');
const UserController = require('./controller/userController');
const DataController = require('./controller/datacontroller');

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

router.get('/data/before/:date', DataController.getDataBefore);

module.exports = router;
