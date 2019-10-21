const { ETCD_URLS } = require('./environment');
const ETCD = require('node-etcd');

const etcd = new ETCD(ETCD_URLS)

/***
 * Connects to ETCD and lists the apps being watched by Big Brother
 *
 * @returns {Array}
 */
function listApps() {
    return etcd.getSync("/clients", {prefix: true});
}

/**
 * Adds a new app to be watch by Big Brother
 * @param name the service name
 * @param address the bb-promster address
 */
function addApp(name, address) {
    etcd.setSync(`/clients/${name}/${address}`);
}

module.exports = {
    listApps,
    addApp
}