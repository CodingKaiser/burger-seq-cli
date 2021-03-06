module.exports = function(sequelize, DataTypes) {
  var Burgers = sequelize.define("BurgersSeq", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Burgers.belongsTo(models.Customer, {
          onDelete: "CASCADE",
        })
      }
    }
  });
  return Burgers;
};
