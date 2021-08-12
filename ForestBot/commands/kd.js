const { bot, db } = require("../bot"), querys = require('../querys.json');
module.exports = {
    commands: ['kills', 'deaths', 'kd'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text) => {
        if( arguments.length === 0 ) {
            db.query(querys.searchKills, [username], async (err, results) => {
                if (err) throw err;
                let kdRatio = results[0].kills / results[0].deaths;
                bot.whisper(username, `kills: ${results[0].kills} , Deaths: ${results[0].deaths} , [KD: ${kdRatio.toFixed(3)}]`);
            })
            return;
        } else if ( arguments.length > 0 ) {
            arguments.toString();
            db.query(querys.searchKills, [arguments], async (err, results) => {
                try {
                let kdRatio = results[0].kills / results[0].deaths;
                bot.chat(`[${arguments}] kills: ${results[0].kills} , Deaths: ${results[0].deaths} , [KD: ${kdRatio.toFixed(3)}]`);
                } catch(e) {
                    console.log(e);
                    bot.whisper(username, "Player not found.");
                    return;
                }
            })
            return;
        }   
        return;
    },
}