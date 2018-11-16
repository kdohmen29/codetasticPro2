module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define("Items", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Items;
}; 