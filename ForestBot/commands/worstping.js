module.exports = {
    commands: ['worstping', 'wp'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot) => {
        let h = Object.entries(bot.players).sort((a, b) => b[1].ping - a[1].ping);
        bot.chat(`Worst Ping: [${h[0][0]}] ${bot.players[h[0][0]].ping}ms`);
        return;
    },
}