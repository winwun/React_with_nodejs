const express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var request = require('request');
var Twitter = require('twitter');

const app = express();
const port = process.env.PORT || 4000;
let accessToken,
    accessTokenSecret,
    consumerKey = 'u41HKMAiZXitUWXqsItV6qebY',
    consumerSecret = '22Jx57BvMxVvifYqd3wHfYGlGsgXwkq8ZobH5LaGCbn9VRnUgz';

//Configure Passport
passport.use(new Strategy({
  consumerKey: 'u41HKMAiZXitUWXqsItV6qebY',
  consumerSecret: '22Jx57BvMxVvifYqd3wHfYGlGsgXwkq8ZobH5LaGCbn9VRnUgz',
  callbackURL: 'http://localhost:4000/login/twitter/return'
},
function(token, tokenSecret, profile, cb) {
  accessToken = token;
  accessTokenSecret = tokenSecret;
  // In this example, the user's Twitter profile is supplied as the user
  // record.  In a production-quality application, the Twitter profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.get('/login',
  function (req, res) {
    res.render('login');
  });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('http://localhost:3000/activityFeed');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/get/tweets', function(req, res) {
    var client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret
    });

    client.get('statuses/home_timeline', {count: 30}, function(error, tweets, response) {
      if (!error) {
         res.status(200).json({ tweets: tweets });
      }
      else {
        res.status(500).json({ error: error });
      }
    });
  });


  app.get('/post/tweet/', function(req, res){
    var client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret
    });
    client.post('statuses/update', req.query, function(error, tweet, response) {
      if (!error) {
         res.status(200).json({ tweet: tweet });
      }
      else {
        res.status(500).json({ error: error });
      }
    })
  });

app.listen(port, () => console.log(`Listening on port ${port}`));