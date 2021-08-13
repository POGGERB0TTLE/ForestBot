module.exports = {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot) => {
        console.log(username, message, arguments, text)
        bot.chat("Hello this is a test command")
        return;
    },
}