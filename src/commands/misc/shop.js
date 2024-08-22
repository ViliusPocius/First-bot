const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder, channelMention, Embed} = require("discord.js");
const { } = require('./work.js');
const items = require('../../../shop.json');

exports.items;
module.exports = {
    name: 'shop',
    description: 'Check the shop',
    deleted: false,
    callback: async (client, interaction) => {

        var shopContent = "";
        for(item of items)
            shopContent+="Role: "+item.pav+" Cost: "+item.cost+"🪙\n";
        console.log(shopContent);
        shopEmbed = new EmbedBuilder()
        .setColor("#0000ff")
        .setTitle("shop")
        .setDescription("check the shop")
        .addFields({ 
            name: "Buy roles",
            value: shopContent,
            inline: true,
        })
        interaction.reply({ embeds: [shopEmbed]});

    },
};