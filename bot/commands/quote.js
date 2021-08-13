const querys = require('../querys.json');
module.exports = {
    commands: ['quote', 'q'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot, db) => {
        if (arguments.length === 0) {
            db.query(querys.quote, [username], async (err, results) => {
                try {
                    bot.chat(`[${username}]: ${results[0].message}`);
                } catch {
                    bot.whisper("You either have no messages saved, or they are too short to be quoted.");
                    return;
                };
            });
            return;
        } else if (arguments.length > 0) {
            arguments.toString();
            db.query(querys.quote, [arguments], async (err, results) => {
                try {
                    if (err) throw err;
                    bot.chat(`[${arguments}]: ${results[0].message}`);
                } catch {
                    bot.whisper(username, "Player not found.");
                    return;
                };
            });
            return;
        };

        return;
    },
};