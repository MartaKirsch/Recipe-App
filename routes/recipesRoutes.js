const express = require('express');
const recipesController = require('../controllers/recipesController.js');

const router = express.Router();

// router.get('/', recipesController.index);

router.post('/load/:num', recipesController.load)

module.exports = router;
