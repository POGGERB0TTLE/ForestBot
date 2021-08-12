const {
    cooldown,
    bot,
    sleep
} = require('../index.js');
const {
    coolDownTime,
    spam
} = require('../config.json')
module.exports = {
    commands: ['skotose'],
    minArgs: 0,
    maxArgs: 0,
    callback: (username, message, arguments, text) => {
        if (cooldown.has(username)) {
            await sleep(1000);
            bot.whisper(username, spam);
        } else {
            await sleep(600);
            var word1 = ["Bro we are making a strip club", "https://www.youtube.com/channel/UCom74ILXH9-BANx9dCL_bvg", "Let's gooooooooooooooo", "thicc chicken at his base", "i guess subscribing is the most important part", "What's wrong with you?"];
            var r = Math.floor(Math.random() * word1.length);
            bot.chat(word[r])
            resolve()
            cooldown.add(username);
            setTimeout(() => {
                // Removes the user from the set after a minute
                cooldown.delete(username);
            }, coolDownTime);
        };
    });
},
}
