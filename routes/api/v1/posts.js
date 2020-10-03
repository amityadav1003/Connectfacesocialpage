var express = require('express');
var router = express.Router();
var apiIndex = require('../../../controllers/api/post_api');
const passport = require('passport');

router.post('/create',apiIndex.create);
// router.delete('/:id',passport.authenticate('jwt',{session:false}),apiIndex.destroy);
module.exports = router;
