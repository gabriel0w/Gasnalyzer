const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Sensor = require('./Sensor');
const Microcontrolador = require('./MicroControlador')

const Dado = db.sequelize.define('Dado', {
  Data_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  temperatura: {
    type: DataTypes.FLOAT,
  },
  umidade: {
    type: DataTypes.FLOAT,
  },
  gas_inflamavel: {
    type: DataTypes.FLOAT,
  },
  monoxido_carbono: {
    type: DataTypes.FLOAT,
  },
  fk_id_microcontrolador: {
    type: DataTypes.STRING,
  },
});

Dado.belongsTo(Sensor, { foreignKey: 'fk_id_sensor' });
Dado.belongsTo(Microcontrolador, { foreignKey: 'fk_id_microcontrolador' });

module.exports = Dado;
