module.exports = function(sequelize, DataTypes) {
  var Departments = sequelize.define("Departments", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Departments;
};


