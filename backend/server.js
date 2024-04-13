const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const cors = require('cors');

const ServiceCustomer = require('./class_controller/ServiceCustomer.js');
const ServiceRestaurant = require('./class_controller/ServiceRestaurant.js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

server.listen(4000, function() {
    console.log("Listening on port 4000");
});