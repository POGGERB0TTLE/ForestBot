const config = require('../config.json');
module.exports = (bot, commandOptions) => {
    let {
        commands,
        minArgs = 0,
        maxArgs = null,
        callback
    } = commandOptions
    if (typeof commands === 'string') { commands = [commands] };
    console.log("\x1b[32m", `Registering command:`, "\x1b[33m", `${commands[0]}`); 
    const cooldown = new Set();
    bot.on('chat:chat', async (content) => {
        let prefix = config.prefix;
        const username = content[0][0], message = content[0][1];
        for (const alias of commands) {
            if (message.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                if (cooldown.has(bot.username)) {
                    bot.whisper(username, "[Anti Spam] - Please wait 3 seconds.");
                    return;
                }
                cooldown.add(bot.username);
                setTimeout(() => { cooldown.delete(bot.username); }, 3400);

                const arguments = message.split(/[ ]+/);
                arguments.shift();
                if (arguments.length < minArgs || (
                    maxArgs !== null && arguments.length > maxArgs
                )) {
                    bot.whisper(username, "Bad Syntax.");
                    return;
                }
                callback(username, message, arguments, arguments.join(' '), bot)
                return;
            }
        }
    })
}