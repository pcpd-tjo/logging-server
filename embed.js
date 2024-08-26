const { EmbedBuilder } = require("discord.js");

const TJO_LOGO = "https://tr.rbxcdn.com/0bf1e583833b37648d2145075ffec876/150/150/Image/Png";

// module.exports = async (properties) => {
//     let embed = new EmbedBuilder()
//         .setTitle(properties["Title"])
//         .setDescription(properties["Description"])
//         .setColor(properties["Color"])
//     return embed
// }

class Embed {
    embed
    constructor({
        title,
        description,
        colour,
        fields=[] // looks like [ { name: 'Field 1', value: 'Value 1' }, { name: 'Field 2', value: 'Value 2' }, ]
    }) {
        const _embed = new EmbedBuilder()
            .setTitle(title)    
            .setDescription(description)    
            .setColor(colour)
            .setFooter({ "text": "Made by UntoldGam", "iconURL": TJO_LOGO })
            .setTimestamp();
        if (fields.length > 0) {
            _embed.addFields(...fields);
        }
        this.embed = _embed;
        return this;
    }
}

module.exports = Embed;