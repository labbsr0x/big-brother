const ETCD_URLS = process.env.ETCD_URLS;

/***
 * Load all envs and structure them correctly
 * @returns {{ETCD_URLS: string[]}}
 */
function loadEnvs() {
    if (!ETCD_URLS) {
        throw "ETCD_URLS cannot be null or empty";
    }

    return {
        'ETCD_URLS': ETCD_URLS.split(",")
    };
};


module.exports = loadEnvs();

