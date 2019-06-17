const express = require('express')
const os = require('os')
const app = express()
const port = 3000

var ping_reponse = 200
var pong_reponse = 200

app.get('/', (req, res) => {
    return res.send('Hello World! I am listening...');
})

app.get('/ping', (req, res) => {
    console.log(`${os.hostname()}: Received request for /ping endpoint at ${new Date()}`);
    return res.status(ping_reponse).send(`Responding ping with ${ping_reponse}`);
})

app.get('/pong', (req, res) => {
    console.log(`${os.hostname()}: Received request for /pong endpoint at ${new Date()}`);
    return res.status(pong_reponse).send(`Responding pong with ${pong_reponse}`);
})

app.get('/change_ping', (req, res) => {
    desired_respose_status = req.query.status
    if (desired_respose_status === undefined || desired_respose_status === "") {
        return res.status(400).send("Parameter 'status' not send.");
    }
    if (isNaN(desired_respose_status)) {
        return res.status(400).send(`Invalid value for 'status' parameter. Must be numeric like '200' or '400'. Received '${desired_respose_status}'`);
    }

    res.send(`Changing response from ${ping_reponse} to ${req.query.status}`);
    ping_reponse = req.query.status;
    return res;
})

app.get('/change_pong', (req, res) => {
    desired_respose_status = req.query.status
    if (desired_respose_status === undefined || desired_respose_status === "") {
        return res.status(400).send("Parameter 'status' not send.");
    }
    if (isNaN(desired_respose_status)) {
        return res.status(400).send(`Invalid value for 'status' parameter. Must be numeric like '200' or '400'. Received '${desired_respose_status}'`);
    }

    res.send(`Changing response from ${pong_reponse} to ${req.query.status}`);
    pong_reponse = req.query.status;
    return res;
})

app.listen(port, () => {
    return console.log(`Example app listening on port ${port}!`);
})   