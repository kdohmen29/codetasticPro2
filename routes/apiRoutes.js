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
    db.Department.findOne({})
  });




  

  app.get("/add/d", function (req, res) {
    // Create an Author with the data available to us in req.body
    db.Department.create({name:"test"}).then(function(result){
      res.send(result)

    })
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

        app.post("/api/department", function (req, res) {
          // Create an Author with the data available to us in req.body
          console.log(req.body);
          db.Department.create(req.body).then(function (dbDepartment) {
            res.json(dbDepartment);

          });
        });

      }
    })
  })
};

