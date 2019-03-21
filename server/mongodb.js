const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongoOptions = {
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 1000,
  keepAlive: 1,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000,
  autoReconnect: true,
  poolSize: 50,
};

const uri = "mongodb+srv://admin:elevatorAdmin@cluster0-oqjar.mongodb.net/test?retryWrites=true";

function initClient() {
  return new Promise((resolve) => {
    mongoose.connect(uri, mongoOptions);
    mongoose.connection.on('connected', resolve);
  });
}

module.exports = {
  initClient,
};