var db = require("../models");
var authController = require('../controller/authcontroller.js');





module.exports = function (app, passport) {

  // Load index page
  app.get("/", function (req, res) {
    db.Department.findAll({}).then(function (dbDepartments) {
      //connects to index.handlebars
      res.render("index", {});
    });
  });
  app.get("/departments", function (req, res) {
    db.Department.findAll({}).then(function (dbDepartments) {
      //connects to index.handlebars
      res.render("department", {
        msg: "This is a test",
        // examples: dbExamples

      });
    });
  });
  

  app.get("/createpost", function (req, res) {
    db.Department.findAll({attributes:["text","id"],raw : true}).then(function (dbDepartments) {
      //connects to index.handlebars
      var hdblsObj = {departments:dbDepartments}
      
      res.render("createpost", hdblsObj);

    });
  });

  app.get("/createpost", function (req, res) {
    db.Department.findAll({attributes:["text","id"],raw : true}).then(function (dbDepartments) {
      //connects to index.handlebars
      var hdblsObj = {departments:dbDepartments}
      
      res.render("posts", hdblsObj);
    });
  });
  
  app.get("/api/departments/:id", function(req,res){
    db.Item.findAll({where: {
      DepartmentId: req.params.id
    }}).then(function(itemData){
      var hdblsObj = {item:itemData}
      
      console.log(hdblsObj);
      res.render("posts", hdblsObj)
    })
  })



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
  app.get("/api/departments/:id", function (req, res) {
    db.Department.findOne({ where: { id: req.params.id } }).then(function (DepartmentId) {
      res.render("posts", {
        Department: DepartmentId
      });
    });
  });


  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',

    failureRedirect: '/signin'
  }

  ));



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
  app.get("/department/", function (req, res) {
    db.Department.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbDepartment) {
      res.render("posts", {
        text: dbDepartment
      });
      console.log(dbDepartment);
      
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
