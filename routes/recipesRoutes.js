const express = require('express');
const recipesController = require('../controllers/recipesController.js');

const router = express.Router();

router.get('/recipe/:id', recipesController.index);

router.get('/save/:id/:action', recipesController.save);

router.post('/load/:num', recipesController.load)

module.exports = router;
