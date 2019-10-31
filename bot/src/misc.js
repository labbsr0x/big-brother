const { Payload } = require('dialogflow-fulfillment');

/**
 *  Prepares a proper dialogflow fulfillment payload to be used as a message with options
 * @param {String} title the message text before the options
 * @param {String[]} texts
 */
function getTelegramButtons(title, texts, callbackPrefix = "") {
    let inline_keyboard = [];
    let row = 0;
    for (let i = 0; i < texts.length; i = i + 2) {
        inline_keyboard.push([]);
        inline_keyboard[row].push({text: texts[i], callback_data: callbackPrefix + texts[i]});
        if (i+1 < texts.length ){
            inline_keyboard[row].push({text: texts[i+1], callback_data: callbackPrefix + texts[i+1]});
        }
        row++;
    }
    let payload = {
        text: title,
        reply_markup: {
            inline_keyboard: inline_keyboard
        }
    };
    return new Payload("TELEGRAM", payload, {sendAsMessage: true});
}

module.exports = {
    getTelegramButtons
};