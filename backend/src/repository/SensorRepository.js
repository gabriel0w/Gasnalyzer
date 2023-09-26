class SensorRepository {
    // Outros métodos do repositório

    static async saveData(parts, timestamp) {
      try {
        if (parts.length >= 4) {
          const [temperatura, umidade, gas_inflamavel, monoxido_carbono] = parts.map(part => parseFloat(part));

          // Use o SensorRepository (ou outro repositório apropriado) para obter o ID do sensor com base em algum critério (por exemplo, nome do sensor)
          const sensorId = await SensorRepository.getSensorIdByName('Nome do Sensor');

          // Crie um novo registro de Dado no banco de dados
          await Dado.create({
            temperatura,
            umidade,
            gas_inflamavel,
            monoxido_carbono,
            fk_id_sensor: sensorId, // Associe o dado ao sensor correspondente
            timestamp,
          });

          console.log('Mensagem salva no banco de dados com sucesso.');
        }
      } catch (error) {
        console.error('Erro ao lidar com a mensagem e salvar dados:', error);
      }
    }
  }
