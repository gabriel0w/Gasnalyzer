const { DataTypes } = require('sequelize');
const db = require('../config/database');

const UsuarioSensor = db.sequelize.define('UsuarioSensor', {
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
