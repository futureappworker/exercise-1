const express = require('express');

const searchController = require('./controllers/searchController');

router = express.Router();

router.get('/api/states', searchController);

module.exports = router;
