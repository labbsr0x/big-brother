'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { messageHandler } = require('./agent');

const app = express();

app.use(bodyParser.json());

app.post("/", messageHandler);

app.get("/", (req, res) => {
    res.status(200).json({"live": true});
});

app.listen(3000,  () => {
    console.log("Started!")
});
