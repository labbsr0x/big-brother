'use strict';

const express = require('express');
const { messageHandler } = require('./agent');

const app = express();

app.post("/", messageHandler);

app.get("/", (req, res) => {
    res.status(200).json({"live": true});
});

app.listen(3000,  () => {
    console.log("Started!")
});
