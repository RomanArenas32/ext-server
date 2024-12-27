const AppServer = require('./models/server');
require('dotenv').config();



const server = new AppServer();

server.listen();