const express = require('express');
const accountController = require('../controllers/accountController.js');


const router = express.Router();

router.get('/', accountController.index);

router.post('/checkLogInData', accountController.logIn);

module.exports = router;
