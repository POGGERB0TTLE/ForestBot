module.exports = {
    commands: ['say'],
    callback: async (username, message, arguments, text, bot) => {
        if (username === 'Furia' || username === 'AlmostHuey' || username === 'UndaB_OZ') {
            return;
        }
        bot.chat(text)
        return;
    },
}