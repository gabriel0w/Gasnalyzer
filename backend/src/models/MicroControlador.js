const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Microcontrolador = db.sequelize.define('Microcontrolador', {
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
