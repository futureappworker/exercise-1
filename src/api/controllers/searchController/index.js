const getMatchStates = require('./helpers/getMatchStates');

const searchController = (req, res) => {
  const {
    search, maxLength = 8,
  } = req.query;
  if (!search) {
    return res.json({
      data: [],
    });
  }
  let result = getMatchStates({ search });
  result = result.sort();
  result = result.slice(0, maxLength);
  res.json({
    data: result,
  });
};

module.exports = searchController;
