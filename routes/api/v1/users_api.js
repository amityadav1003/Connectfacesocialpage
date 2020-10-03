var express = require('express');
var router = express.Router();
const passport = require('passport');
var apijwt = require('../../../controllers/api/users_api');

router.post('/createSession',apijwt.createSession);

module.exports = router;