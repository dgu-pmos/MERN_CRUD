var express = require('express');
var router = express.Router({ margeParams : true });

router.use('/api', require('./api'));

module.exports = router;
