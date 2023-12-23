const { EmbedBuilder } = require("discord.js");

const TJO_LOGO = "https://tr.rbxcdn.com/0bf1e583833b37648d2145075ffec876/150/150/Image/Png";

module.exports = async (properties) => {
    let embed = new EmbedBuilder()
        .setTitle(properties["Title"])
        .setDescription(properties["Description"])
        .setFooter({ "text": "Made by UntoldGam", "iconURL": TJO_LOGO })
        .setColor(properties["Color"])
    return embed
} 