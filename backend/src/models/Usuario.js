const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Sensor = require('./Sensor');
const bcrypt = require('bcryptjs');

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
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true, // O campo pode ser nulo porque nem todos os usuários terão um token de redefinição o tempo todo
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true, // Este campo também pode ser nulo e armazenará a data e hora de expiração do token
  },
});

Usuario.beforeCreate(async (usuario) => {
  if (usuario.senha) {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  }
});

// Defina a relação entre Usuario e Sensor
Usuario.belongsToMany(Sensor, {
  through: 'UsuarioSensor',
  foreignKey: 'id_user',
});

module.exports = { User: Usuario };
