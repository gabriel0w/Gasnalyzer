const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailerService = require('../services/emailservice');
const crypto = require('crypto');
const userRepository = require('../repository/UserRepository');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { senha, email, telefone } = req.body;

    await userRepository.createUser({
      ...req.body,
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

    console.log(password);
    console.log(user.senha);

    const isValidPassword = await bcrypt.compare(password, user.senha);
    console.log(isValidPassword)
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
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hora a partir de agora

    await userRepository.setResetTokenAndExpiration(email, resetToken, resetTokenExpiration);

    const resetLink = `http://localhost:3002/reset-password/${resetToken}`;
    await nodemailerService.sendEmail(email, 'Redefinição de Senha', resetLink);

    res.send('E-mail enviado com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await userRepository.findByResetToken(resetToken);
    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    await userRepository.resetPassword(user.id_user, newPassword);

    res.send('Senha redefinida com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha' });
  }
};

module.exports = { register, login, requestResetPassword, resetPassword };
