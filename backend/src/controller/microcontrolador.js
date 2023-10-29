const MicrocontroladorService = require('../services/microcontrolador-service');

class MicrocontroladorController {
  constructor() {
    this.microcontroladorService = new MicrocontroladorService();
  }

  async criarMicrocontrolador(req, res) {
    try {
      const { tipo_chip, Localizacao } = req.body;

      const novoMicrocontrolador = await this.microcontroladorService.criarMicrocontrolador({
        tipo_chip,
        Localizacao,
      });

      res.status(201).json(novoMicrocontrolador);
    } catch (error) {
      console.error('Erro ao criar microcontrolador:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
}

module.exports = MicrocontroladorController;
