const { bot } = require("./bot.js");
const draw = require("./draw.js");
setInterval(function () {
  let arr = [];
  const playerList = Object.keys(bot.players);
  playerList.forEach(function (i) {
    if (!bot.players[i]) return console.log("something went wrong");
    let name = bot.players[i].username;
    let ping = bot.players[i].ping;
    arr.push(`${name}:${ping}`);
  });
  draw.render(arr.sort());
}, 15000);
