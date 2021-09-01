//Poggerbottle's command 
const sleep = require('../misc/sleep.js');
```js
module.exports = {
    commands: ['poggerbottle'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (username, message, arguments, text, bot) => {
        await sleep(600);

        var word1 = [
                  "Very Poggers guy.",
                  "Kinda Pog, lul",
                  "Bussin respectfully ", 
                  "Proud Forestbot Suporter",
                  "Rightful owner of the word Pog"
              ];

        var r = Math.floor(Math.random() * word1.length);
        bot.chat(word1[r])
    },
}
```
this is your command, just made it all you gotta do it create a pull request in the /commands folder here:
https://github.com/Febzey/ForestBot/tree/main/src/commands
