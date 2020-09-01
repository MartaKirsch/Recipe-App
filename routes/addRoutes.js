const express = require('express');
const addController = require('../controllers/addController.js');

const router = express.Router();

router.get('/', addController.index);

module.exports = router;
