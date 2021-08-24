const sleep = require('../misc/sleep.js');

module.exports = {
    commands: ['skotose'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (username, message, arguments, text, bot) => {
        await sleep(600);
        var word1 = ["Bro we are making a strip club", "https://www.youtube.com/channel/UCom74ILXH9-BANx9dCL_bvg", "Let's gooooooooooooooo", "thicc chicken at his base", "i guess subscribing is the most important part", "What's wrong with you?"];
        var r = Math.floor(Math.random() * word1.length);
        bot.chat(word1[r])
    },
}