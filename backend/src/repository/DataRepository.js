const { fn, col, literal, Op, Sequelize  } = require('sequelize');
const DadoModel = require("../models/Dado");
const SensorModel = require("../models/Sensor");
const MicrocontroladorModel = require("../models/MicroControlador");

class DataRepository {

  async saveData(unidade, fk_id_sensor, timestamp) {
    try {
      if (!isNaN(unidade) && !isNaN(fk_id_sensor)) {
        await DadoModel.create({
          unidade: unidade,
          fk_id_sensor: fk_id_sensor,
          timestamp: timestamp,
        });
        console.log("Dado salvo no banco de dados com sucesso.");
      } else {
        console.error("Erro ao salvar os dados: Valores inválidos.");
      }
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  }

  async getMonthlyAverageBySensor(year) {
    try {
      const sensors = await SensorModel.findAll();
      let monthlyAverages = {};

      for (const sensor of sensors) {
        if (!sensor.id_sensor) {
          console.error("Sensor encontrado sem ID válido:", sensor);
          continue;
        }

        const monthlyData = await DadoModel.findAll({
          where: {
            fk_id_sensor: sensor.id_sensor,
            [Op.and]: [
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year)
            ]
          },
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('unidade')), 'avgUnit'],
            [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month']
          ],
          group: ['month'],
          raw: true,
        });

        monthlyData.forEach(data => {
          const monthName = new Date(year, data.month - 1).toLocaleString('default', { month: 'long' });
          if (!monthlyAverages[sensor.tipo]) {
            monthlyAverages[sensor.tipo] = {};
          }
          monthlyAverages[sensor.tipo][monthName] = parseFloat(data.avgUnit.toFixed(2));
        });
      }

      return monthlyAverages;
    } catch (error) {
      console.error("Erro ao calcular a média mensal por sensor para o ano:", error);
      throw error;
    }
  }

  async getDataBetweenDates(startDate, endDate) {
    try {
      const dados = await  DadoModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: [{
          model: SensorModel,
          include: [{ // Include MicrocontroladorModel through SensorModel
              model: MicrocontroladorModel
          }]
      }],
        order: [['createdAt', 'ASC']], // Ordena os dados pela data, do mais antigo para o mais recente
      });

      return dados;
    } catch (error) {
      console.error("Erro ao buscar dados entre as datas:", error);
      throw error;
    }
  }
}

module.exports = new DataRepository();
