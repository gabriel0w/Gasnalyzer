const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioSensor = sequelize.define('UsuarioSensor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  notificar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = UsuarioSensor;
