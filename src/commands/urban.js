const ud = require("urban-dictionary");
module.exports = {
    commands: ['urban'],
    minArgs: 0,
    maxArgs: 5,
    callback: (username, message, arguments, text, bot) => {
        let definition = text;
        ud.define(`${definition}`, (error, results) => {
            if (error) { bot.whisper(username, "No results found."); return; };
            let def = results[0].definition, length = 170;
            const trimmedString = def.length > length ? def.substring(0, length - 3) + "..." : def;
            bot.chat(trimmedString.split("\r\n")[0]);
            return;
        })
        return;
    },
}
