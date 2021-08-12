const { bot } = require("../bot"), ud = require("urban-dictionary");
module.exports = {
    commands: ['urban'],
    minArgs: 0,
    maxArgs: 5,
    callback: (username, message, arguments, text) => {
        let definition = arguments.toString();
        ud.define(`${definition}`, async (error, results) => {
            if (error) { bot.whisper(username, "No results found."); throw error; };
            let def = results[0].definition, length = 170;
            const trimmedString = def.length > length ? def.substring(0, length - 3) + "..." : def;
            bot.chat(trimmedString);
            return;
        })
        return;
    },
}