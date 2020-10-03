var express = require('express')
var router = express.Router()
// const indexController = require('../controllers/index');
const userController = require('../controllers/user_controller');
const postController = require('../controllers/post_controller')
const passport = require('passport');

router.get('/',userController.home)
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/Signin',userController.Signin);
router.get('/Signup',userController.Signup);
router.post('/create',userController.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/Signin'},
), userController.createSession);
router.get('/Signout',userController.destroySession);
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));
router.use('/likes',require('./like'));

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/Signin'}), userController.createSession);

module.exports = router;