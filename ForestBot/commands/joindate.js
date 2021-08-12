const { bot, db } = require("../bot"), querys = require('../querys.json');
module.exports = {
    commands: ['jd', 'joindate', 'joined'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text) => {
        if ( arguments.length === 0 ) {
            db.query(querys.searchJoindate, [username], async (err, results) => {
                bot.whisper(username, `Your joindate is ${results[0].joindate}`);
                return;
            });
            return;
        } else if ( arguments.length > 0 ) {
            arguments.toString();
            db.query(querys.searchJoindate, [arguments], async (err, results) => {
                try {
                    bot.chat(`[${results[0].username}] joined ${results[0].joindate}`);
                    return;
                } catch(e) {
                    console.log(e);
                    bot.whisper(username, "I could not find that players joindate.")
                    return;
                }
            })
            return;
        }
        return;
    },
}