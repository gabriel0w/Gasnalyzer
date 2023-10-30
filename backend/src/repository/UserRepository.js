const { User } = require('../models/Usuario');

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
}

module.exports = new UserRepository();
