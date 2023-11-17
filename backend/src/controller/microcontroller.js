const microcontroladorService = require('../services/microcontrolador-service');

class MicrocontroladorController {

  async getMicrocontrollers(req, res) {
    try {
      const microcontrollers = await microcontroladorService.getAllMicrocontrollers();
      res.json(microcontrollers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSensorsByMicrocontroller(req, res) {
    try {
      const { microcontrollerId } = req.params;
      const sensors = await microcontroladorService.getSensorsByMicrocontrollerId(microcontrollerId);
      res.json(sensors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createMicrocontroller(req, res) {
    try {
      const newMicrocontroller = await microcontroladorService.createMicrocontroller(req.body);
      res.status(201).json(newMicrocontroller);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteMicrocontroller(req, res) {
    try {
      const { microcontrollerId } = req.params;
      await microcontroladorService.deleteMicrocontroller(microcontrollerId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MicrocontroladorController();
