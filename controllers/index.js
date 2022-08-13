const { sumOfTwo } = require('../helpers/helpers')

exports.getIndex = (req, res) => {
  const result =  sumOfTwo(4, 5)
  res.send({msg: `hello from index ${result}`});
};
