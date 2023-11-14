const { fn, col, literal, Op } = require('sequelize');

class DataRepository {
  constructor(DadoModel, SensorModel, MicrocontroladorModel) {
    this.DadoModel = DadoModel;
    this.SensorModel = SensorModel;
    this.MicrocontroladorModel = MicrocontroladorModel;
  }

  async getAnualAverageData(date) {
    try {
      // Buscar a média mensal dos dados anteriores a 'date'
      const averages = await this.DadoModel.findAll({
        where: {
          timestamp: {
            [Op.lt]: date // Filtra dados anteriores à data especificada
          }
        },
        attributes: [
          [fn('AVG', col('temperatura')), 'avgTemperatura'],
          [fn('AVG', col('umidade')), 'avgUmidade'],
          [fn('AVG', col('gas_inflamavel')), 'avgGasInflamavel'],
          [fn('AVG', col('monoxido_carbono')), 'avgMonoxidoCarbono'],
          // Use DATE_FORMAT para agrupar por ano e mês
          [fn('DATE_FORMAT', col('timestamp'), '%Y-%m'), 'month']
        ],
        group: [literal('month')],
        order: [[literal('month'), 'ASC']]
      });

      return averages;
    } catch (error) {
      console.error("Erro ao buscar a média mensal dos dados:", error);
      throw error; // Propagar o erro
    }
  }

  async getDailyAverageDataBeforeDate(date) {
    try {
      // Buscar a média diária dos dados anteriores à data especificada
      const dailyAverages = await this.DadoModel.findAll({
        where: {
          timestamp: {
            [Op.lt]: date // Menor que a data especificada
          }
        },
        attributes: [
          [fn('AVG', col('temperatura')), 'avgTemperatura'],
          [fn('AVG', col('umidade')), 'avgUmidade'],
          [fn('AVG', col('gas_inflamavel')), 'avgGasInflamavel'],
          [fn('AVG', col('monoxido_carbono')), 'avgMonoxidoCarbono'],
          // Use DATE_FORMAT para agrupar por dia
          [fn('DATE_FORMAT', col('timestamp'), '%Y-%m-%d'), 'day']
        ],
        group: [literal('day')],
        order: [[literal('day'), 'ASC']]
      });

      return dailyAverages;
    } catch (error) {
      console.error("Erro ao buscar a média diária dos dados:", error);
      throw error; // Propagar o erro
    }
  }

  static async saveData(parts, timestamp) {
    try {
      const convertedData = this.convertData(parts);

      if (convertedData) {
        // Os dados foram convertidos com sucesso, agora você pode criar um novo registro de Dado
        await Dado.create({
          temperatura: convertedData.temperatura,
          umidade: convertedData.umidade,
          gas_inflamavel: convertedData.gas_inflamavel,
          monoxido_carbono: convertedData.monoxido_carbono,
          fk_id_sensor: convertedData.sensorId, // Associe o dado ao sensor correspondente
          timestamp: timestamp,
        });
        console.log("Mensagem salva no banco de dados com sucesso.");
      } else {
        console.error("Erro ao converter os dados ou valores inválidos.");
      }
    } catch (error) {
      console.error("Erro ao lidar com a mensagem e salvar dados:", error);
    }
  }

  async getDataBeforeDate(date) {
    try {
      // Buscar dados anteriores a 'date'
      const dados = await this.DadoModel.findAll({
        where: {
          timestamp: {
            [Sequelize.Op.lt]: date, // Op.lt significa "menor que"
          },
        },
        order: [["timestamp", "DESC"]], // Opção para ordenar os dados pela data, do mais recente ao mais antigo
      });

      return dados;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error; // É uma boa prática propagar o erro para que o chamador possa tratá-lo
    }
  }

  async getSensorIdById(sensorId) {
    try {
      // Converta a string para um número inteiro (int)
      const id = parseInt(sensorId, 10);

      const sensor = await this.SensorModel.findByPk(id);

      if (sensor) {
        return sensor.id;
      } else {
        console.error(`Sensor não encontrado com o ID: ${id}`);
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar o sensor:", error);
      return null;
    }
  }

  _convertData(parts) {
    try {
      if (parts.length >= 4) {
        const [
          temperaturaStr,
          umidadeStr,
          gas_inflamavelStr,
          monoxido_carbonoStr,
          sensorIdStr,
        ] = parts;

        // Converter as strings para os tipos apropriados
        const temperatura = parseFloat(temperaturaStr);
        const umidade = parseFloat(umidadeStr);
        const gas_inflamavel = parseFloat(gas_inflamavelStr);
        const monoxido_carbono = parseFloat(monoxido_carbonoStr);
        const sensorId = parseInt(sensorIdStr, 10);

        // Validar se os valores convertidos são válidos
        if (
          !isNaN(temperatura) &&
          !isNaN(umidade) &&
          !isNaN(gas_inflamavel) &&
          !isNaN(monoxido_carbono) &&
          !isNaN(sensorId)
        ) {
          return {
            temperatura,
            umidade,
            gas_inflamavel,
            monoxido_carbono,
            sensorId,
            timestamp,
          };
        } else {
          console.error(
            "Erro ao converter ou validar os dados: Valores inválidos."
          );
          return null;
        }
      } else {
        console.error(
          "Erro ao converter ou validar os dados: Número insuficiente de partes."
        );
        return null;
      }
    } catch (error) {
      console.error("Erro ao converter os dados:", error);
      return null;
    }
  }
}
