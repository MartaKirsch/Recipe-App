const express = require('express');
const searchController = require('../controllers/searchController.js');

const router = express.Router();

router.get('/', searchController.index);

module.exports = router;
