var db = require("../models");
var authController = require('../controller/authcontroller.js');



module.exports = function (app, passport) {

  // Load index page


  
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',

      failureRedirect: '/signup'
    }

    ));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    // Load example page and pass in an example by id
    app.get("/store/", function (req, res) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
        res.render("store", {
          example: dbExample
        });
      });
    });


    app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',

      failureRedirect: '/signin'
    }

    ));

r
  



  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',

      failureRedirect: '/signup'
    }

  ));

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout); 
  

  // Load example page and pass in an example by id
  app.get("/store/", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("store", {
        example: dbExample
      });
    });
  });
 


  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',

      failureRedirect: '/signin'
    }

  ));






  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

      return next();

    res.redirect('/signin');

  }

};
