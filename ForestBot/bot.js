const mineflayer = require("mineflayer"),
  Discord = require("discord.js"),
  client = new Discord.Client(),
  mysql = require("mysql"),
  config = require("./config.json"),
  channels = require('./channels.json'),
  date = require("date-and-time"),
  query = require("./querys.json"),
  fs = require("fs"),
  path = require("path");
require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 15;

let channel = channels.mainLiveChat, HOST = config.mcServer;
const red = "#d9534f", green = "#5cb85c", grey = "#292b2c", orange = "#f0ad4e", purple = 10551521, pink = 16724383;

const bot = mineflayer.createBot({ //Creating minecraft bot
  host: HOST,
  username: process.env.USER,
  password: process.env.PASS,
  auth: config.accountType,
  version: config.version,
});

const db = mysql.createPool({ //Creating mySql connection
  host: process.env.dbHOST,
  user: process.env.dbUSER,
  password: process.env.dbPASS,
  database: config.database,
});
db.getConnection((e) => {
  if (e) return console.log(e);
  console.log("\x1b[32m%s\x1b[0m", "MySql Connected...");
});

function monthYear() {
  const t = new Date();
  const p = date.compile("MMM DD/YY");
  return date.format(t, p);
}
function dateTime() {
  const t = new Date();
  const p = date.compile("MMM DD/YY");
  return date.format(t, p) + " at " + date.format(t, "hh:mmA [CDT]");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const baseFile = "command-base.js";
const commandBase = require(`./commands/${baseFile}`);
const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else if (file !== baseFile) {
      const options = require(path.join(__dirname, dir, file));
      commandBase(bot, options);
    }
  }
};

module.exports = {
  bot,
  db,
  sleep,
  monthYear,
};

const embed = async (c, m) => { //main way of sending messages to discord from bot
  channel.forEach((chnl) => {
    return client.channels.cache
      .get(chnl)
      .send({ embed: { color: c, description: m } });
  });
};

client.on("message", async (m) => {
  if (m.content.startsWith(`${config.prefix}setbridge ${HOST}`)) { //this command is still a work in progress. and will switch over to the discord bot soon.
    if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("You need to be a server Admin for this.");
    const arguments = m.content.split(/[ ]+/); arguments.shift();
    let StringedArgs = arguments[1].toString();
    const invalid = "Invalid channel ID!";
    if (m.guild.channels.cache.get(StringedArgs) === undefined || isNaN(StringedArgs)) {
      m.reply(invalid);
      return;
    } else {
      m.reply("Chat Bridge Initialized..")
      let Channel = await JSON.parse(fs.readFileSync("./channels.json", "utf8"));
      Channel.mainLiveChat.push(StringedArgs);
      fs.writeFile("./channels.json", JSON.stringify(Channel), (err) => {
        if (err) return console.log(err);
      })
      channel = Channel.mainLiveChat;
      console.log(channel)
      return;
    }
  }
  channel.forEach((chnl) => {
    if (m.channel.id !== chnl) return;
    if (m.author.id === client.user.id) return;
    bot.chat(`${m.member.user.tag} » ${m.content}`);
  })
  return;
});

bot.on("chat:chat", async (a) => { //minecraft bot main chat listener
  embed(grey, `**${a[0][0]}** » ${a[0][1]}`);
});

const playtime = async () => { //playtime recorder for each player online (saves every minute)
  Object.keys(bot.players).forEach((player) => {
    db.query(query.updatePlaytime, [player]);
  });
  return;
};

async function saveUser(player) { //saving new users who join the server
  db.query(query.checkUser, [player.username], async (e, result) => {
    if (!result.length) {
      db.query(query.insertUser, [
        player.username,
        0,
        0,
        dateTime(),
        player.uuid,
      ]);
      if (config.welcomeMessages === true) {
        bot.chat(player.username + " joined for the first time.");
      }
      return;
    }
    return;
  });
}

bot.once("login", async () => {
  readCommands("commands");
  embed(green, bot.username + " joined the server: " + HOST);
  require("./patterns.js"); 
  require("./tab.js");
  setInterval(playtime, 60000);
});

setTimeout(function () { //player joined/leave events
  bot.on("playerJoined", async (a) => {
    await saveUser(a);
    return (
      embed(green, `**${a.username} joined the server.**`),
      db.query(query.updateJoins, [dateTime(), a.username])
    );
  });
  bot.on("playerLeft", async (a) => {
    return (
      embed(red, `**${a.username} left the server.**`),
      db.query(query.updateLeaves, [dateTime(), a.username])
    );
  });
}, 15000);

bot.on("chat:teleport", async (content) => { //tpa ForestBot
  const a = content[0][0];
  bot.chat(a + "! I am accepting your teleport request!");
  await sleep(1200);
  bot.chat("/tpaccept");
});

bot.on("chat:pve", async (a) => { //when someone dies from environment
  let v = a[0][0];
  db.query(query.updateDeaths, [v]);
  return embed(purple, `${a[0].input}`);
});

bot.on("chat:pvp", async (a) => { //when a player kills another player
  let v = a[0][0],
    m = a[0][1];
  db.query(query.updateKills, [m]);
  db.query(query.updateDeaths, [v]);
  return embed(purple, `${a[0].input}`);
});

bot.on("chat:MSGpluginRegex", (content) => { //for whisper messages using the MSG plugin
  const user = content[0][0],
    message = content[0][1];
  return embed(pink, `${user} » ${message}`);
});

bot.on("chat:whisperTo", (content) => { //whipser to event
  const user = content[0][0],
    message = content[0][1];
  return embed(pink, `${user} » ${message}`);
});
bot.on("chat:whisperFrom", (content) => { //whisper from event
  const user = content[0][0],
    message = content[0][1];
  return embed(pink, `${user} » ${message}`);
});

bot.on("error", (e) => { //if bot gets an error
  return embed(orange, `**${e}**`);
});
bot.on("kicked", (e) => { //when the bot gets kicked from the server..
  return embed(orange, `**${e}**`);
});
bot.on("end", async () => { //when bot leaves
  embed(orange, `**Attempting to rejoin in 15 seconds...**`);
  await sleep(15000);
  process.exit();
});
client.login(process.env.TOKEN); //logging in the discord bot.
