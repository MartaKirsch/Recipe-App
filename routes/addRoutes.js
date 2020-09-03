const express = require('express');
const addController = require('../controllers/addController.js');

const router = express.Router();

router.get('/', addController.index);

router.post('/addRecipe', addController.addRecipe)

module.exports = router;
