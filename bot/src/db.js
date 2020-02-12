const { ETCD_URLS } = require('./environment');
const { Etcd3 } = require('etcd3');

const etcd = new Etcd3({hosts: ETCD_URLS});

/**
 * Connects to ETCD and lists the apps being watched by Big Brother
 * @returns {Promise<string[]>}
 */
function listApps() {
    return etcd.getAll().prefix("/clients").keys().then((appss) => {
        let apps = appss.map((sub) => { 
            let res = sub.split("/", 3); 
            return res.length === 3 ? res[res.length - 1] : undefined 
        })
        apps = apps.filter(Boolean)
        return new Promise((resolve) => {
            resolve(apps);
        });
    });
}

/**
 * Adds a new app to be watch by Big Brother
 * @param {String} name the service name
 * @param {String} address the bb-promster address
 * @returns {Promise<IPutResponse>}
 */
async function addApp(name, address) {
    let keyExists = await etcd.getAll().prefix(`/clients/${name}/${address}`).keys();
    if (!keyExists || (Array.isArray(keyExists) && keyExists.length === 0)) {
        return etcd.put(`/clients/${name}/${address}`).value("").exec();
    }
    throw Error("Duplicated app")
}

/**
 * Stops the monitoring of the application by Big Brother
 * @param {String} name the name of the application to be removed
 * @returns {Promise<IDeleteRangeResponse>}
 */
function rmApp(name) {
    return etcd.delete().all().prefix(`/clients/${name}`).exec();
}

/**
 * Stores a subscription relationship between a TELEGRAM chat and an app
 * @param {String} name the name of the app to subscribe to
 * @param {String} chatId the id of the chat identifying which chat wants to subscribe to the app identified by name
 * @returns {Promise<IPutResponse>}
 */
function subscribeToApp(name, chatId) {
    return etcd.put(`/subscriptions/${name}/${chatId}`).value("").exec();
}

/**
 * Deletes a subscriptions relationship between a TELEGRAM chat and an app
 * @param {String} name the name of the app to subscribe to
 * @param {Stirng} chatId the id of the chat identifying which chat wants to unsubscribe to the app identified by name
 * @returns {Promise<IDeleteRangeResponse>}
 */
function unsubscribeToApp(name, chatId) {
    return etcd.delete().all().prefix(`/subscriptions/${name}/${chatId}`).exec();
}

/**
 * Lists the existing subscriptions for a specific app
 * @param {String} name the name of the app to subscribe to
 * @returns {Promise<string[]>}
 */
function listSubscriptions(name) {
    return etcd.getAll().prefix(`/subscriptions/${name}`).keys().then((subss) => {
        let chats = subss.map((sub) => { 
            let res = sub.split("/"); 
            return res[res.length - 1] 
        })
        return new Promise((resolve) => {
            resolve(chats);
        });
    });
}

module.exports = {
    listApps,
    addApp,
    rmApp,
    subscribeToApp,
    unsubscribeToApp,
    listSubscriptions,
    etcd
}