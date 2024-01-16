const usaStates = require('../data/usaStates.json');

const getMatchStates = ({ search }) => {
  const states = usaStates.data;
  
  const result = [];
  for (let i = 0; i < states.length; i += 1) {
    const state = states[i];
    const regex = new RegExp(search, 'i');
    if (regex.test(state)) {
      result.push(state);
    }
  }
  return result;
};

module.exports = getMatchStates;
