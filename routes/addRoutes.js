const express = require('express');
const addController = require('../controllers/addController.js');

const router = express.Router();

router.get('/', addController.index);
router.get('/:id', addController.index);

router.post('/addRecipe', addController.addRecipe);
router.post('/addRecipe/update/:id', addController.updateRecipe);

module.exports = router;
