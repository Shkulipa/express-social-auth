const router = require("express").Router();
const passport = require("passport");

router.get(
  "/login/success", 
  (req, res) => {
    if(req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        // cookies: req.cookies,
      })
    }
  }
)

router.get(
  "/login/failed", 
  (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure"
    })
  }
)

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});


/**
 * Google
 */
router.get(
  "/google", 
  passport.authenticate(
    "google", 
    { 
      /**
       * Here all avaible scope's:
       * https://developers.google.com/identity/protocols/oauth2/scopes#adexchangesellerv2.0
       */
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ],
    }
  )
)

router.get(
  "/google/callback", 
  passport.authenticate(
    "google", 
    { 
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
    }
  )
)

/**
 * Github
 */
 router.get(
   "/github", 
   passport.authenticate(
     "github", 
     { scope: ["profile"] }
    )
);

 router.get(
   "/github/callback",
   passport.authenticate("github", {
     successRedirect: process.env.CLIENT_URL,
     failureRedirect: "/login/failed",
   })
 );

 /**
 * facebook
 * but will work only with https protocol
 */
  router.get(
    "/facebook", 
    passport.authenticate(
      "facebook", 
      { scope: ["profile"] }
     )
 );
 
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );

module.exports = router;