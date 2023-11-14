const { User } = require('../models/Usuario');
const { Op } = require("sequelize");

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(userId) {
    return await User.findOne({ where: { userId } });
  }

  async updateUser(userId, userData) {
    return await User.update(userData, { where: { id: userId } });
  }

  async deleteUser(userId) {
    return await User.destroy({ where: { id: userId } });
  }

  async setResetTokenAndExpiration(email, resetToken, resetTokenExpiration) {
    return await User.update(
      { resetToken, resetTokenExpiration },
      { where: { email } }
    );
  }

  async findByResetToken(resetToken) {
    return await User.findOne({
      where: {
        resetToken,
        resetTokenExpiration: { [Op.gt]: new Date() } // Apenas encontra se a expiração é maior que o tempo atual
      }
    });
  }

  async resetPassword(userId, newPassword) {
    return await User.update(
      { senha: newPassword, resetToken: null, resetTokenExpiration: null },
      { where: { id_user: userId } }
    );
  }
}

module.exports = new UserRepository();
