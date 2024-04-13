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

app.post('/api/customer/register', async (req,res) => {
    const body = req.body;
    const customerEmail = body.customerEmail;
    const customerName = body.customerName;
    const customerPhone = body.customerPhone;
    const customerPassword = body.customerPassword;

    if (customerEmail === undefined || customerName === undefined || customerPhone === undefined || customerPassword === undefined) {
        return res.send("Wrong Parameter");
    }

    try {
        const serviceCustomer = new ServiceCustomer();
        const newCustomerCode = await serviceCustomer.registerCustomer(customerEmail, customerName, customerPhone, customerPassword);
        res.json({customerCode: newCustomerCode});
    } catch (error) {
        res.status(error.status).json({error: error.message});
    }
})

server.listen(4000, function() {
    console.log("Listening on port 4000");
});