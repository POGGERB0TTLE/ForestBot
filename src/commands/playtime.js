const querys = require('../data/querys.json');
module.exports = {
    commands: ['pt', 'playtime'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot, db) => {
        const dhms = (time) => {
            (d = Math.floor(time / (1000 * 60 * 60 * 24))),
                (h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                (m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            return `${d} Day(s) ${h} hours ${m} minutes.`;
        }
        if (arguments.length === 0) {
            db.query(querys.searchPlaytime, [username], async (err, results) => {
                if (err) throw err;
                let formatTime = dhms(results[0].playtime);
                bot.whisper(username, `[${username}]: ${formatTime}`);
                return;
            })
            return;
        } else if (arguments.length > 0) {
            arguments.toString()
            db.query(querys.searchPlaytime, [arguments], async (err, results) => {
                try {
                    if (err) throw err;
                    let formatTime = dhms(results[0].playtime);
                    bot.chat(`[${arguments}]: ${formatTime}`);
                } catch {
                    bot.whisper(username, "Player not found.");
                    return;
                }
            })
        }
        return;
    },
}