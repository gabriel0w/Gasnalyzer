const router = require('express').Router();

const TestController = require('@controller/test.js');

router.get('/', TestController.helloworld);

module.exports = router;