const querys = require('../data/querys.json');
module.exports = {
    commands: ['msgcount', 'messages'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot, db) => {
        if (arguments.length === 0) {
            db.query(querys.msgCount, [username], async (err, results) => {
                try {
                    bot.whisper(username, `You have sent ${results[0].cnt} messages.`);
                } catch {
                    bot.whisper(username, "No messages saved.")
                    return;
                }
            })
            return;
        } else if (arguments.length > 0) {
            arguments.toString();
            db.query(querys.msgCount, [arguments], async (err, results) => {
                try {
                    if (err) throw err;
                    bot.chat(`[${arguments}] Messages Sent: ${results[0].cnt}`);
                } catch {
                    bot.whisper(username, `No messages found from user: ${arguments}`);
                    return;
                }
            })
            return;
        }
        return;
    },
}