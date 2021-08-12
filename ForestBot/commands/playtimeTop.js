const { bot, db } = require("../bot"), querys = require('../querys.json');
module.exports = {
    commands: ['top'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text) => {
        const dhms = (time) => {
            (d = Math.floor(time / (1000 * 60 * 60 * 24))),
                (h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                (m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            return `${d} Day(s)`;
        }
        db.query(querys.playtimeTop, (err, results) => {
            if (err) throw err;
            bot.chat(`[${results[0].username}]: ${dhms(results[0].playtime)} | [${results[1].username
                }]: ${dhms(results[1].playtime)} | [${results[2].username}]: ${dhms(
                    results[2].playtime
                )}`)
        })
        return;
    },
}