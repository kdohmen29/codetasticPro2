var db = require("../models");


module.exports = function (app) {
  // Get all departments
  app.get("/api/department", function (req, res) {
    db.Department.findAll({}).then(function (dbDepartment) {
      res.json(dbDepartment);
    });
  });
  
  app.get("/api/department/:id", function (req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Department.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.get("/add/d", function (req, res) {
    // Create an Author with the data available to us in req.body
    db.Department.create({name:"test"}).then(function(result){
      res.send(result)

    })
  });
  
  
  //create Oath passport
  app.get('/api/passport', function (req, res) {
    
    res.send('Welcome to Passport with Sequelize');
    
  });
  
  // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbExample) {
  //     res.json(dbExample);)}
        // // Create a new example
        // app.post("/api/examples", function(req, res) {
        //   db.Example.create(req.body).then(function(dbExample) {
        //     res.json(dbExample);
        //   });
        // });

        // // Delete an example by id
        // app.delete("/api/examples/:id", function(req, res) {
        //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        //     res.json(dbExample);
        //   });
        // });
      };