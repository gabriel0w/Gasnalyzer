'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      senha: {
        type: Sequelize.STRING, // Aqui você pode armazenar o hash da senha
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING,
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

    // Crie a tabela de associação para o relacionamento muitos para muitos
    await queryInterface.createTable('UsuarioSensors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id_user',
        },
        allowNull: false,
      },
      id_sensor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sensors',
          key: 'id_sensor',
        },
        allowNull: false,
      },
      notificar: {
        type: Sequelize.BOOLEAN,
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
    // Reverter a criação das tabelas
    await queryInterface.dropTable('UsuarioSensors');
    await queryInterface.dropTable('Usuarios');
  },
};
