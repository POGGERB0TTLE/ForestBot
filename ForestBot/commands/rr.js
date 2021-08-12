const { bot, sleep } = require("../bot")
module.exports = {
    commands: ['rr'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username, message, arguments, text) => {
        await sleep(600);
        var word1 = [
            "Rabid",
            "Radiant",
            "Radical",
            "Radioactive",
            "Rakish",
            "Rambunctious",
            "Rampant",
            "Raspy",
            "Ratty",
            "Raucous",
            "Ravenous",
            "Rebellious",
            "Recalcitrant",
            "Recondite",
            "Reliable",
            "Repulsive",
            "Resilient",
            "Restless",
            "Rhetorical",
            "Ruthless",
            "Registered",
        ];
        var word2 = [
            "Raiders",
            "Retards",
            "Rebels",
            "Revolutionaries",
            "Reapers",
            "Rickrollers",
            "Rammsteins",
        ];
        var r1 = Math.floor(Math.random() * word1.length);
        var r2 = Math.floor(Math.random() * word2.length);
        bot.chat("RR = " + word1[r1] + " " + word2[r2]);
        return;
    },
}