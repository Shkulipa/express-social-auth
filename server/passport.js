const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");

/**
 * get GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET here:
 * Create Credentials -> OAuth ID client -> Web aplication
 * Where:
 * Authorized JavaScript origins: http://client.com
 * Authorized redirect URIs: http://server.com/auth/google/callback, http://client.com
 * https://console.cloud.google.com/apis/credentials?project=hr-tests-tasks
 */
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE;

const GITHUB_CLIENT_ID = process.env.CLIENT_ID_GITHUB;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET_GITHUB;

const FACEBOOK_CLIENT_ID = process.env.CLIENT_ID_FACEBOOK;
const FACEBOOK_CLIENT_SECRET = process.env.CLIENT_SECRET_FACEBOOK;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("middleware accessToken", accessToken);
    console.log("middleware google", profile);
    done(null, profile)
  }
));

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("middleware Github", profile);
      done(null, profile);
    }
  )
);

 /**
 * but will work only with https protocol
 */
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
    console.log("middleware facebook", profile);
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser", user);
  done(null, user);
});