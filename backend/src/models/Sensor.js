const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define('Sensor', {
  id_sensor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unid_medida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Limite_min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Limite_Max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Sensor;
