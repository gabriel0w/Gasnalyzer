const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dado = sequelize.define('Dado', {
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
});

Dado.belongsTo(Sensor, { foreignKey: 'fk_id_sensor' });

module.exports = Dado;
