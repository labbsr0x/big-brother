/***
 * This package handles bot messages from dialog flow
 */

const { WebhookClient, Text, Card, Image, Suggestion, Payload } = require('dialogflow-fulfillment');
const { listApps } = require('./db')
const intentMap = new Map();

const actions = [
    new Suggestion("Subscribe to one or more apps"),
    new Suggestion("Unsubscribe to one or more apps"),
    new Suggestion("Add a new app"),
    new Suggestion("Remove an app"),
    new Suggestion("Change an app's bb-promster address"),
    new Suggestion("Help with setting up my app observation cluster")
];

/**
 * Handles the Default Welcome Intent
 * @param agent a dialogflow fulfillment webhook client
 */
function welcome(agent){
    agent.add("Welcome to Big Brother! I'm responsible for taking care of your apps!")
    let apps = listApps()
    if (apps.length > 0) {
        agent.add("Here is the list of apps I'm watching right now:")
        agent.add(apps.join("\n"));
    } else {
        agent.add("At this moment, there are no apps being watched by me!")
    }

    agent.add("Here's what you can do:");
    for (let i = 0; i < actions.length; i++) {
        agent.add(actions[i]);
    }
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
