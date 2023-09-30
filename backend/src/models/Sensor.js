const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Microcontrolador = require('./MicroControlador')

const Sensor = db.sequelize.define('Sensor', {
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

Sensor.belongsTo(Microcontrolador, { foreignKey: 'fk_id_microcontrolador' });

module.exports = Sensor;
