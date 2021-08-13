const { db } = require("../bot"), querys = require('../querys.json');
module.exports = {
    commands: ['seen', 'lastseen'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot) => {
        if (arguments.length === 0) {
            db.query(querys.lastSeen, [username], async (err, results) => {
                if (err) throw err;
                bot.whisper(username, `${results[0].lastseen}`);
            })
            return;
        } else if (arguments.length > 0) {
            arguments.toString();
            db.query(querys.lastSeen, [arguments], async (err, results) => {
                try {
                    if (err) throw err;
                    bot.chat(`I last saw [${arguments}] on ${results[0].lastseen}`);
                } catch {
                    bot.whisper(username, "Player not found.");
                    return;
                }
            })
            return;
        }
        return;
    },
}