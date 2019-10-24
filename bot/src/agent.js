/***
 * This package handles bot messages from dialog flow
 */

const { WebhookClient, Text, Card, Image, Suggestion, Payload } = require('dialogflow-fulfillment');
const { getTelegramButtons } = require('./misc')
const { listApps } = require('./db')
const intentMap = new Map();

const actions = [
    "List all apps being watched by me",
    "Subscribe to alerts",
    "Unsubscribe to alerts",
    "Add a new app",
    "Remove an app",
    "Change an app's bb-promster address",
    "Help with setting up my app observation cluster"
];

/**
 * Handles the Default Welcome Intent
 * @param agent a dialogflow fulfillment webhook client
 */
function welcome(agent){
    agent.add(getTelegramButtons("Welcome to Big Brother! I'm responsible for taking care of your apps! Here's what you can do with me:", actions));
}

/**
 * Handles the List of the registered apps
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function list(agent) {
    let apps = listApps();
    if (apps.length > 0) {
        agent.add(getTelegramButtons("Here is the list of apps I'm watching right now.\nClick one to subscribe:", apps));
    } else {
        agent.add("At this moment, there are no apps being watched by me!")
    }
}

/**
 * Handles the Subscription of one or more apps
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function subscribe(agent) {
    // TODO
}

/**
 * Handles the Unsubscription of one or more apps
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function unsubscribe(agent) {
    // TODO
}

/**
 * Handles the Addition of a new app to be observed by Big Brother
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function addApp(agent) {
    // TODO
}

/**
 * Handles the Removal of one app that is currently being observed by Big Brother
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function removeApp(agent) {
    // TODO
}

/**
 * Handles the Update of an app that is currently being observer by Big Brother
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function changeApp(agent) {
    // TODO
}

/**
 * Gives instructions on how to setup the observation cluster for Big Brother
 * @param {WebhookClient} agent a dialogflow fulfillment webhook client
 */
function help(agent) {
    // TODO
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
    intentMap.set("list", list);
    intentMap.set("subscribe", subscribe);
    intentMap.set("unsubscribe", unsubscribe);
    intentMap.set("add", addApp);
    intentMap.set("remove", removeApp);
    intentMap.set("change", changeApp);
    intentMap.set("help", help);
    return {
        messageHandler
    }
}

module.exports = init();
