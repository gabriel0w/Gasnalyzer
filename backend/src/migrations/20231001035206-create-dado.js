'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dados', {
      Data_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      temperatura: {
        type: Sequelize.FLOAT,
      },
      umidade: {
        type: Sequelize.FLOAT,
      },
      gas_inflamavel: {
        type: Sequelize.FLOAT,
      },
      monoxido_carbono: {
        type: Sequelize.FLOAT,
      },
      fk_id_sensor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sensors',
          key: 'id_sensor', // Verifique se a coluna correta está sendo referenciada aqui
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dados');
  },
};
