var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Department.findAll({}).then(function(dbDepartments) {
      //connects to index.handlebars 
      res.render("index", {
      });
    });
  });
  app.get("/departments", function(req, res) {
    db.Department.findAll({}).then(function(dbDepartments) {
      //connects to index.handlebars 
      res.render("department", {
        msg: "This is a test",
        // examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Department.findOne({ where: { id: req.params.id } }).then(function(dbDepartments) {
      res.render("example", {
        example: dbDepartments
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
