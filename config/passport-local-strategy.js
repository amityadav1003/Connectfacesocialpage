const passport = require('passport');
const User = require('../model/UserSchema');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField:'email'
},
    function(email , password, done){
        User.findOne({email:email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false);
            }
            if(user.password != password){
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is autheticated
passport.checkAuthentication = function(req,res,next){
//if its signed in pass the function to controller
if(req.isAuthenticated()){
   return next();
}
return res.redirect('/Signin')
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

//export this file
module.exports = passport;
