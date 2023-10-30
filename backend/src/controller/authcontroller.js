const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailerService = require('../services/emailservice');
const crypto = require('crypto');
const userRepository = require('../repository/UserRepository');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    await userRepository.createUser({
      ...req.body,
      password: hashedPassword
    });
    res.status(201).send('Usuário registrado com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    await userRepository.updateUser(user.id, { resetToken });

    const resetLink = `http://your-frontend-url/reset-password/${resetToken}`;
    await nodemailerService.sendEmail(user.email, 'Redefinição de Senha', resetLink);

    res.send('E-mail enviado com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await userRepository.findByEmail({ resetToken });
    if (!user) {
      return res.status(404).json({ message: 'Token inválido ou expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await userRepository.updateUser(user.id, { password: hashedPassword, resetToken: null });
    res.send('Senha redefinida com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha' });
  }
};

module.exports = { register, login, requestResetPassword, resetPassword };
