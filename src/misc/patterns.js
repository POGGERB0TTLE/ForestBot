module.exports = (bot) => {
  //REGEX
  const USERNAME_REGEX = "(?:\\(.+\\)|\\[.+\\]|.)*?(\\w+)";

  bot.addChatPattern(
    "MSGpluginRegex",
    /\[(?:FROM|TO)\] \[([A-Za-z0-9]+)\] > (.*)/,
    { parse: true }
  );

  bot.addChatPattern(
    "whisper",
    new RegExp(`^\\[${USERNAME_REGEX} -> \\w+\\s?\\] (.*)$`)
  );

  bot.addChatPattern("whisperTo", /^\[me -> ([^ ]*)\] (.*)$/, { 
    parse: true,
   }); //[me -> ForestBot] message

  bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> me\] (.*)$/, {
    parse: true,
  }); //[ForestBot -> me] message
  bot.addChatPattern("whisperTo", /^You whisper to ([^ ]*): (.*)$/, {
    parse: true,
  }); //You whisper to ForestBot: message
  bot.addChatPattern("whisperFrom", /^([^ ]*) whispers: (.*)$/, {
    parse: true,
  }); //ForestBot whispers: message
  bot.addChatPattern("whisperTo", /^\[You -> ([^ ]*)\] (.*)$/, { 
    parse: true,
   }); // [You -> Febzey] message
  bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> You\] (.*)$/, {
    parse: true,
  }); // [Febzey -> You] message
  bot.addChatPattern("chat", /^<([^ ]*)> (.*)$/, { 
    parse: true,
   }); // <febzey> message
  bot.addChatPattern("chat", /^([^ ]*): (.*)$/, { 
    parse: true,
   }); // febzey: message
  bot.addChatPattern("chat", /^([^ ]*) » (.*)$/, { 
    parse: true,
   }); // febzey » message
  bot.addChatPattern("chat", /^([^ ]*) > (.*)$/, { 
    parse: true,
   }); // febzey > message
  bot.addChatPattern(
    "teleport",
    /^([A-Za-z0-9]+) has requested to teleport to you.$/,
    { parse: true }
  );

  bot.addChatPattern(
    "pvp",
    /^([^ ]*) (?:was slain by|drowned whilst trying to escape|experienced kinetic energy whilst trying to escape|was shot by|was blown up by|hit the ground too hard whilst trying to escape|was killed trying to hurt) (.*)$/,
    { parse: true }
  );

  bot.addChatPattern(
    "pve",
    /^([^ ]*) (?:died|tried to swim in lava|was pricked to death|Was killed by nature|drowned|blew up|was killed by|hit the ground too hard|experienced kinetic energy|fell from a high place|fell off a ladder|fell while climbing|went up in flames|burned to death|was struck by lightning|was killed by magic|starved to death|was stung to death|suffocated in a wall|withered away|froze to death|went off with a bang)$/,
    { parse: true }
  );
};
