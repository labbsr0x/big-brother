/***
 * This package handles bot messages from dialog flow
 */

const { WebhookClient, PLATFORMS, Text, Card, Image, Suggestion, Payload } = require('dialogflow-fulfillment');
const { listApps } = require('./db')
const intentMap = new Map();

const actions = [
    [{text: "Subscribe to one or more apps", callback_data: "Subscribe to one or more apps"},
    {text: "Unsubscribe to one or more apps", callback_data: "Unsubscribe to one or more apps"}],
    [{text: "Add a new app", callback_data: "Add a new app"},
    {text: "Remove an app", callback_data: "Remove an app"}],
    [{text: "Change an app's bb-promster address", callback_data: "Change an app's bb-promster address"},
    {text: "Help with setting up my app observation cluster", callback_data: "Help with setting up my app observation cluster"}]
];

/**
 * Handles the Default Welcome Intent
 * @param agent a dialogflow fulfillment webhook client
 */
function welcome(agent){
    agent.add("Welcome to Big Brother! I'm responsible for taking care of your apps!")
    let apps = listApps();
    if (apps.length > 0) {
        agent.add("Here is the list of apps I'm watching right now:")
        agent.add(apps.join("\n"));
    } else {
        agent.add("At this moment, there are no apps being watched by me!")
    }


    let payload = {
        text: "Here's what you can do with me:",
        reply_markup: {
            inline_keyboard: actions
        }
    };
    agent.add(new Payload("TELEGRAM", payload, {sendAsMessage: true}));
}

/**
 * A handler for dialogflow messages
 * @param req http request
 * @param res http response
 */
function messageHandler(req, res) {
    let agent = new WebhookClient({'request': req, 'response': res});
    agent.handleRequest(intentMap);
}

/**
 * Module initializer
 * @returns {{messageHandler: messageHandler}}
 */
function init() {
    intentMap.set("Default Welcome Intent", welcome);
    return {
        messageHandler
    }
}

module.exports = init();
