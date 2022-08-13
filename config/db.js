const mongoose = require('mongoose');
const config = require('./index');

const ConnectDB = async () => {

  try {
    mongoose.connect(config.app.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDb Connected...')
  } catch (err) {
    console.error(err);
  }
}

module.exports = ConnectDB;