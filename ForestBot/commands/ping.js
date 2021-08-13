module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot) => {
        if (arguments.length === 0) {
            bot.whisper(username, "Your ping is: " + bot.players[username].ping + "ms")
        } else if (arguments.length > 0) {
            arguments.toString()
            try {
                bot.chat(`[${arguments}] ${bot.players[arguments].ping}ms`);
            } catch(e) {
                console.log(e)
                bot.whisper(username, `I do not think ${arguments} is online right now.`)
                return;
            }
        }
    }
}