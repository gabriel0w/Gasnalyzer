'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Microcontroladors', {
      id_chip: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      tipo_chip: {
        type: Sequelize.STRING,
      },
      Localizacao: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Microcontroladors');
  },
};
