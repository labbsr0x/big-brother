'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { messageHandler } = require('./agent');
const { alert } = require('./alert');
const { listApps, addApp, rmApp, subscribeToApp, unsubscribeToApp } = require('./db');
const app = express();

app.use(bodyParser.json());

app.post("/", messageHandler);

app.get("/test", (req, res) => {
    alert("teste", "ALERT! 1, 2, 3!").then(() => {
        res.status(200).json({"alerts": "sent"})
    });
});

app.post("/alertmanager", async (req, res) => {
    let alertmanager = req.body
    try {
        if (alertmanager.receiver == "bot") {
            for (let al of alertmanager.alerts) {
                if ("app" in al.annotations) {
                    await alert(al.annotations.app, al.annotations.description)
                }
            }
        }
        res.status(200).json({
            "live": true,
            "body": req.body
        });
    } catch (error) {
        console.debug("Error on alert manager", error)
    }
});

app.post("/addApp", async (req, res) => {
    console.log("add app")
    try {
        await addApp(req.body.name, req.body.address)
        res.status(200).json({
            "status": "OK"
        })
    } catch (error) {
        console.log("Cannot add app", error)
        res.status(400).json({
            "status": "Error"
        })        
    }
})

app.post("/test/alert", async (req, res) => {
    try {
        await alert(req.body.app, req.body.description)
        res.status(200).json({
            "status": "OK"
        })
    } catch (error) {
        console.debug("error", error)
        res.status(400).json({
            status: "Error"
        })
    }
})

app.get("/listApps", async (req, res) => {
    console.log("list app")
    let apps = await listApps()
    res.status(200).json({
        "apps": apps
    })
})

app.post("/subscribe", async (req, res) => {
    console.log("list app")
    await subscribeToApp(req.body.name, req.body.chatId)
    res.status(200).json({
        "status": "OK"
    })
})

// app.post("/", (req, res) => {
//     console.log("Passou aqui a request")
//     res.status(200).json({
//         "live": true,
//         "body": req.body
//     });
// });



app.listen(3000,  () => {
    console.log("Started!");
});
