const FAKE_DATA = require('./stab');

const mocks = {
    Query: () => ({
        allParrots: () => FAKE_DATA.PARROTS,
        parrot: () => FAKE_DATA.PARROTS[0],
    }),
    Mutation: () => ({
        addNewParrot: () => FAKE_DATA.NEW_PARROT,
        updateParrot: () => FAKE_DATA.NEW_PARROT,
        deleteParrots: () => FAKE_DATA.PARROTS[0],
    }),
  };

  module.exports = mocks;