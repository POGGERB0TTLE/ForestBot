const { bot } = require("../bot")
module.exports = {
    commands: ['bestping', 'bp', 'pingbest'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text) => {
        let highestPing = Object.entries(bot.players).sort(
            (a, b) => a[1].ping - b[1].ping
        );
        bot.chat(`Best Ping: [${highestPing[0][0]}] ${bot.players[highestPing[0][0]].ping}ms`)
        return;
    },
}