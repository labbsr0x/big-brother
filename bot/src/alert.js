const { listSubscriptions } = require('./db');
const { TELEGRAM_TOKEN } = require('./environment');
const https = require('https');

function alert(name, message) {
    listSubscriptions(name).then((subss) => {
        let sendMessagePath = `bot${TELEGRAM_TOKEN}/sendMessage`;

        subss.forEach((subs) => {
            let req = https.request({
                host: "https://api.telegram.org/",
                path: sendMessagePath,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }, (res) => {
                if (res.statusCode == 200) {
                    console.log(`Sent message to '${subs}'`);
                } else {
                    console.log(`Couldn't send message to '${subs}'`);
                }
            });

            req.write(JSON.stringify({
                chatId: subs,
                text: message
            }));

            req.end();

        });
    });
    return Promisses;
}

module.exports = {
    alert
}