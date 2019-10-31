const { ETCD_URLS } = require('./environment');
const { Etcd3 } = require('etcd3');

const etcd = new Etcd3({hosts: ETCD_URLS});

/***
 * Connects to ETCD and lists the apps being watched by Big Brother
 *
 * @returns {Array}
 */
function listApps() {
    return etcd.getAll().prefix("/clients").keys().then((apps) => {
        for (let i = 0; i < apps.length; i++) {
            let strs = apps[i].split("/", 3);
            apps[i] = strs[strs.length - 1];
        }
        return new Promise((resolve) => {
            resolve(apps);
        });
    });
}

/**
 * Adds a new app to be watch by Big Brother
 * @param name the service name
 * @param address the bb-promster address
 */
function addApp(name, address) {
    return etcd.put(`/clients/${name}/${address}`).value("").exec();
}

/**
 * Stops the monitoring of the application by Big Brother
 * @param {String} name the name of the application to be removed
 */
function rmApp(name) {
    return etcd.delete().all().prefix(`/clients/${name}`).exec();
}

module.exports = {
    listApps,
    addApp,
    rmApp
}