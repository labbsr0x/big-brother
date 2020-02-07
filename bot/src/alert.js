const { listSubscriptions } = require('./db');
const { TELEGRAM_TOKEN } = require('./environment');
const axios = require('axios');
const https = require('https');

async function alert(name, message) {
    let subss = await listSubscriptions(name); 
    let sendMessagePath = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    let promisses = subss.map((chatId) => {
        return axios.post(sendMessagePath,
            {
                chat_id: chatId,
                text: `${message}`
            })
    });
    return Promise.all(promisses);
}

module.exports = {
    alert
}