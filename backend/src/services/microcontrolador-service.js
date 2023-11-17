const microcontrollerRepository = require('../repository/MicroControllerRepository');

class MicrocontrollerService {

  async getAllMicrocontrollers() {
    return await microcontrollerRepository.DBgetAllMicrocontrollers();
  }

  async getSensorsByMicrocontrollerId(microcontrollerId) {
    return await microcontrollerRepository.DBgetSensorsByMicrocontrollerId(microcontrollerId);
  }

  async createMicrocontroller(data) {
    return await microcontrollerRepository.DBCreateMicrocontroller(data);
  }

  async deleteMicrocontroller(microcontrollerId) {
    return await microcontrollerRepository.DBDeleteMicrocontroller(microcontrollerId);
  }
}

module.exports = new MicrocontrollerService();
