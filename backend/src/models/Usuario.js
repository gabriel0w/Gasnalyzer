const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Sensor = require('./Sensor');

const Usuario = db.sequelize.define('Usuario', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senha: {
    type: DataTypes.STRING, // Aqui você pode armazenar o hash da senha
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Defina a relação entre Usuario e Sensor
Usuario.belongsToMany(Sensor, {
  through: 'UsuarioSensor',
  foreignKey: 'id_user',
});

module.exports = Usuario;
