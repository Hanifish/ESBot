var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription("ಠ_ಠ");

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "ಠ_ಠ";
}