const userRepository = require('../repository/UserRepository');

class UserController {
  async createUser(req, res) {
    try {
      const { senha, email, telefone } = req.body;

      // Verificação para assegurar que todos os campos necessários estão presentes
      if (!email || !senha || !telefone) {
        return res.status(400).send({ message: "All fields are required" });
      }

      // Checar se o usuário já existe
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).send({ message: "Email already in use" });
      }

      // Criar o usuário com os dados recebidos
      const newUser = await userRepository.createUser({ senha, email, telefone });

      // Se tudo ocorreu bem, retornar o usuário criado
      return res.status(201).send(newUser);
    } catch (error) {
      // Se ocorrer algum erro, capturá-lo e retornar uma resposta de erro
      console.error(error); // Log do erro para depuração
      return res.status(500).send({ message: "Internal server error", error: error.message });
    }
  }
}

module.exports = new UserController();
