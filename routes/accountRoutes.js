const express = require('express');
const accountController = require('../controllers/accountController.js');


const router = express.Router();

router.get('/', accountController.index);
router.post('/', accountController.index);

router.get('/checkIfLoginExists/:name', accountController.checkIfLoginExists);

router.get('/checkIfEmailExists/:name', accountController.checkIfEmailExists);

router.get('/checkLogInData/:login/:pass', accountController.logIn);

router.get('/logOut', accountController.logOut);

router.post('/register', accountController.register);

module.exports = router;
