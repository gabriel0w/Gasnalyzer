const { Microcontrolador } = require('../models/MicroControlador');

class MicrocontroladorService {
  async criarMicrocontrolador({ tipo_chip, Localizacao }) {
    try {
      const microcontrolador = await Microcontrolador.create({
        tipo_chip,
        Localizacao,
      });
      return microcontrolador;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MicrocontroladorService;
