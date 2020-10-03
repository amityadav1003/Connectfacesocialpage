var express = require('express');
var router = express.Router();
router.use('/post',require('./posts'));
router.use('/post',require('./users_api'));
module.exports = router;