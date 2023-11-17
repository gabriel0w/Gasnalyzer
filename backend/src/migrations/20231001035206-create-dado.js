'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dados', {
      Data_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unidade: {
        type: Sequelize.FLOAT,
      },
      fk_id_sensor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sensors', // Certifique-se de que o nome da tabela esteja correto
          key: 'id_sensor',
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
