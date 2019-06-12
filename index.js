const express = require('express')
const os = require('os')
const app = express()
const port = 3000

var response_status = 200

app.get('/', (req, res) => {
    return res.send('Hello World! I am listening...');
})

app.get('/healthz', (req, res) => {
    console.log(`${os.hostname()}: Received request for /healthz endpoint at ${new Date()}`);
    return res.status(response_status).send(`Responding with ${response_status}`);
})

app.get('/change_response', (req, res) => {
    desired_respose_status = req.query.status
    if (desired_respose_status === undefined || desired_respose_status === "") {
        return res.status(400).send("Parameter 'status' not send.");
    }
    if (isNaN(desired_respose_status)) {
        return res.status(400).send(`Invalid value for 'status' parameter. Must be numeric like '200' or '400'. Received '${desired_respose_status}'`);
    }

    res.send(`Changing response from ${response_status} to ${req.query.status}`);
    response_status = req.query.status;
    return res;
})

app.listen(port, () => {
    return console.log(`Example app listening on port ${port}!`);
})   