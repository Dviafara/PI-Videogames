const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platform:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true,
        isArray: function (value) {
          if (!Array.isArray(value)) {
            throw new Error('Debe ser de tipo array');
          }
        }
      }
    },
    background_image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        max: 5.0,
        min: 0.0,
      }
    }
  }, 
  { 
    timestamps: false 
  });
};