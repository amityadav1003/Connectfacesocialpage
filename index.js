const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passportGoogle = require('./config/passport-google-oauth');
const customMware = require('./config/middleware');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(cookieParser());
app.use(express.urlencoded());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('assets'));

app.use(session({
  name: 'connectface',
  // TODO change the secret before deployment in production mode
  secret: 'itsasecret',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (100 * 60 *100)
  },
  store: new MongoStore({
    mongooseConnection:db,
    autoRemove:'disabled'
  })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes/index'));





app.listen(port,function(err){
  if(err){
    console.log('error in listening to the port 8000',err)
  }
  console.log('port is up and running on',port);
})