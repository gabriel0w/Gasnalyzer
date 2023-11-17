const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Sensor = require('./Sensor');

const Dado = db.sequelize.define('Dado', {
  Data_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unidade: {
    type: DataTypes.FLOAT,
  },
});

Dado.belongsTo(Sensor, { foreignKey: 'fk_id_sensor' });

module.exports = Dado;
