module.exports = {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username, message, arguments, text, bot, db) => {
        console.log(username, message, arguments, text)
        let query = 'SELECT * from users where username = ?'
        let pre_query = new Date().getTime();
        // run the job
        db.query(query, ['ForestBot'], function (err, rows, fields) {
            if (err) throw err;
            let post_query = new Date().getTime();
            let duration = (post_query - pre_query) / 1000;

            const text = `Database Latency: ${duration} | Bot Ping: ${bot.players[bot.username].ping}`
            bot.chat(text)
        });

        return;
    },
}