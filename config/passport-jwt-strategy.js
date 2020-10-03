const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
  const  ExtractJwt = require('passport-jwt').ExtractJwt;
  const User = require('../model/UserSchema');
   let opts = {
       jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken,
       secretOrKey:'connectface'
   }

   passport.use(new JwtStrategy(opts,function(jwtpayload,done){
    User.findById(jwtpayload._id,function(err,user){
        if(err){
            console.log('error in finding user',err);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
   }))
   module.exports = passport;
