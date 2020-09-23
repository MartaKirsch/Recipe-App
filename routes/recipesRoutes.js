const express = require('express');
const recipesController = require('../controllers/recipesController.js');

const router = express.Router();

router.get('/recipe/:id', recipesController.index);

router.get('/save/:id/:action', recipesController.save);

router.get('/delete/:id', recipesController.deleteRecipe);

router.get('/rate/:rate/:id', recipesController.rateRecipe);

router.get('/checkLogIn', recipesController.checkLogIn);

router.post('/load/:num', recipesController.load);

module.exports = router;
