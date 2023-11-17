const DataRepository = require('../repository/DataRepository');

class DataService {

  async saveData(unidade, fk_id_sensor, timestamp) {
    try {
      return await DataRepository.saveData(unidade, fk_id_sensor, timestamp);
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyAverageBySensor(year) {
    try {
      return await DataRepository.getMonthlyAverageBySensor(year);
    } catch (error) {
      throw error;
    }
  }

  async getDataBetweenDates(startDate, endDate) {
    try {
      return await DataRepository.getDataBetweenDates(startDate, endDate);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DataService();
