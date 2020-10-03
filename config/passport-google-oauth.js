const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/UserSchema');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '191263702314-91h6bgm42nkjv50pc4odd2b64lre6e7l.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: 'kow_zGCjZJDEvOAmnwjCTTEb', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:3000/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;