module.exports = {
    commands: ['commands', 'help'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (username, message, arguments, text, bot) => {
        bot.whisper(username, `https://forestbot.io for command list and general information.`)
        return;
    },
}