const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Microcontrolador = sequelize.define('Microcontrolador', {
  id_chip: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tipo_chip: {
    type: DataTypes.STRING,
  },
  Localizacao: {
    type: DataTypes.STRING,
  },
});

module.exports = Microcontrolador;
