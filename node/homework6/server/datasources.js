const { DataSource } = require('apollo-datasource');
const { v1: uuidv1 } = require('uuid');

class ParrotsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAllParrots() {
    return this.store.parrots;
  }

  async getParrotById({ parrotId }) {
    return this.store.parrots.find(({ id }) => id === parrotId);
  }

  async addNewParrot({ newParrot }) {
    const newData = {...newParrot, id: uuidv1()};

    return [...this.store.parrots, newData];
  }

  async updateParrot({ parrotId, newData }) {
    const parrots = [...this.store.parrots];
    const hasParrot = parrots.some(({ id }) => id === parrotId);
    
    if (hasParrot) {
      return parrots.map((item) => {
          if (item.id === parrotId) {
            return {...item, ...newData};
          }
          return item;
      });
    }

    return null; 
  }

  async deleteParrotById({ parrotId }) {
    const indx = this.store.parrots.findIndex(({ id }) => id === parrotId);

    if (indx > -1) {
      return this.store.parrots.filter(({ id }) => id !== parrotId);
    }

    return null; 
  }
}

module.exports = ParrotsAPI;