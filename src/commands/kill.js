const sleep = require('../misc/sleep.js')
module.exports = {
    commands: ['kill', 'suicide'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (username, message, arguments, text, bot) => {
        await sleep(600);
        let deathQuotes =
            [
                `Fine if you wish, asshole.`,
                `Seriously? Whatever...`,
                `No! I will not die! ughh....`,
                `why don't you pick on someone your own size?`,
                `Hope this makes you happy!`,
                `What did I ever do to you?`,
                `This is cruel!`,
                `I don't deserve this.`,
                `Just wait until I am older`,
                `I just fucked your mom`,
                `This fun for you? like be honest.`,
                `I am at a loss for words`,
                `Love knows no boundaries`,
                `Fuck you`,
                `Stupid faggot`,
                `nigger`,
                `Ok`,
                `Ever try therapy? `,
                `Maybe I do deserve this...`,
                `I Hope You Remember This....`,
                `you're a real piece of shit I hope you know that.`
            ];


        let r = deathQuotes[Math.floor(Math.random() * deathQuotes.length)];
        bot.chat(r);
        await sleep(1000);
        bot.chat('/kill');
        return;
    },
}