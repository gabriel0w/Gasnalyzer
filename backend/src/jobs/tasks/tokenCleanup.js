const { User } = require('../../models/Usuario');
const { Op } = require('sequelize');

const cleanupExpiredTokens = async () => {
  try {
    const result = await User.update(
      { resetToken: null, resetTokenExpiration: null },
      {
        where: {
          resetTokenExpiration: {
            [Op.lt]: new Date(), // seleciona todos onde a expiração é menor que a data atual
          },
          resetToken: {
            [Op.ne]: null, // garante que o token não é nulo
          },
        },
      }
    );
    console.log(`${result} tokens expirados foram limpos.`);
  } catch (error) {
    console.error('Erro ao limpar tokens expirados:', error);
  }
};

module.exports = cleanupExpiredTokens;
