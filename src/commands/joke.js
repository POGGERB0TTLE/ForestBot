module.exports = {
    commands: ['joke', 'jokes'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (username, message, arguments, text, bot) => {
        let jokes =
            [
                'What is the difference between a screw and a pregnant woman ? You can’t unscrew the woman.',
                'What does my dad have in common with Nemo ? They can’t be found.',
                'Why are there no pharmacies in Africa ? Because you can’t take medicine on an empty stomach.',
                'Don’t hate on the LGBTQ + and furry community, they are saving us space in heaven. ',
                'Why is it so hard to break up with a Japanese woman ? You have to drop the bomb on her twice to get it.',
                'People are like jellybeans and licorice, no one likes the blacks.',
                'What’s the difference of an apple and a black guy ? The apple will eventually fall of the tree it’s hanging from.',
                'A black man and a Mexican man were in a car.Who is driving ? The police.',
                'As an Asian, I am exited for Apple’s new product, the Apple iOpener!',
            ];
        let r = jokes[Math.floor(Math.random() * jokes.length)];
        bot.chat("> " + r);
        return;
    },
}