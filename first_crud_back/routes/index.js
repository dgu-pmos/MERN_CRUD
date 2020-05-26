var express = require('express');
var router = express.Router({ margeParams : true });

router.use('/auth', require('./auth'));
router.use('/api/tutorials', require('./api'));

module.exports = router;
