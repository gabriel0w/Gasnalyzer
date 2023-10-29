'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sensors', {
      id_sensor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unid_medida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Limite_min: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Limite_Max: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fk_id_microcontrolador: {
        type: Sequelize.STRING, // Certifique-se de que o tipo corresponde ao tipo da chave estrangeira em seu modelo
        allowNull: false,
        references: {
          model: 'Microcontroladors', // Verifique se o nome da tabela é correto
          key: 'id_chip', // Verifique se a coluna correta está sendo referenciada aqui
        },
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
    await queryInterface.dropTable('Sensors');
  },
};
