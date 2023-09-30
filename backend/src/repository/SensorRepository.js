class SensorRepository {

  constructor(DadoModel, SensorModel, MicrocontroladorModel) {
    this.DadoModel = DadoModel;
    this.SensorModel = SensorModel;
    this.MicrocontroladorModel = MicrocontroladorModel;
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
        console.log('Mensagem salva no banco de dados com sucesso.');
      }
        else {
          console.error('Erro ao converter os dados ou valores inválidos.');
        }
    } catch (error) {
      console.error('Erro ao lidar com a mensagem e salvar dados:', error);
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
        console.error('Erro ao buscar o sensor:', error);
        return null;
      }
    }

    _convertData(parts) {
      try {
        if (parts.length >= 4) {
          const [temperaturaStr, umidadeStr, gas_inflamavelStr, monoxido_carbonoStr, sensorIdStr] = parts;

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
            console.error('Erro ao converter ou validar os dados: Valores inválidos.');
            return null;
          }
        } else {
          console.error('Erro ao converter ou validar os dados: Número insuficiente de partes.');
          return null;
        }
      } catch (error) {
        console.error('Erro ao converter os dados:', error);
        return null;
      }
    }
}
