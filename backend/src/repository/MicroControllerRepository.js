const  Sensor  = require("../models/Sensor");
const  MicroControlador  = require("../models/MicroControlador");

class MicrocontrollerRepository {

    async DBgetAllMicrocontrollers() {
      try {
        return await MicroControlador.findAll();
      } catch (error) {
        console.error("Erro ao buscar microcontroladores:", error);
        throw error;
      }
    }

    async DBgetSensorsByMicrocontrollerId(microcontrollerId) {
      try {
        return await Sensor.findAll({
          where: { fk_id_microcontrolador: microcontrollerId }
        });
      } catch (error) {
        console.error("Erro ao buscar sensores do microcontrolador:", error);
        throw error;
      }
    }

    async DBCreateMicrocontroller(data) {
        try {
          const newMicrocontroller = await MicroControlador.create(data);
          return newMicrocontroller;
        } catch (error) {
          console.error("Erro ao criar microcontrolador:", error);
          throw error;
        }
    }

    async DBDeleteMicrocontroller(microcontrollerId) {
        try {
          const deleted = await MicroControlador.destroy({
            where: { id_chip: microcontrollerId }
          });
          return deleted; // Retorna o número de registros excluídos (deve ser 1 se a exclusão for bem-sucedida)
        } catch (error) {
          console.error("Erro ao excluir microcontrolador:", error);
          throw error;
        }
    }
}

module.exports = new MicrocontrollerRepository();
