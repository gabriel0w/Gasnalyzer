const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
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
