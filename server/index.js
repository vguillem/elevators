const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);

const mongoClient = require('./mongodb');
const postElevatorAction = require('./routes/postElevatorAction');
const getElevatorsActions = require('./routes/getElevatorsActions');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.disable('x-powered-by');
app.set('port', (3001));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(bodyParser.json({ limit: '15mb' }));
app.use(allowCrossDomain);

app.post('/elevatorAction', (req, res) => {
  postElevatorAction(req, res);
});

app.get('/elevatorsActions', (req, res) => {
  getElevatorsActions(req, res);
});

async function initServer() {
  await mongoClient.initClient();
}

async function startServer() {
  await initServer();
  const port = app.get('port');
  server.listen(port, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server started');
    }
  });
}

startServer();
