const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder} = require("discord.js");
const { connectMonggose } = require('../../db.js');
const userSchema  = require('../../models/userSchema');
module.exports = {
    name: 'top',
    description: 'Get users with most money',
    deleted: false,
    callback: async (client, interaction) => {
        const userScheme = await userSchema.find({}, {name:true, money:true}).sort({money:-1}).limit(10);
        var topContent = "";
        var count = 1;
        for(usr of userScheme)
        {
            if(count == 1)
            {
                topContent+="🥇 " + usr.name + "----------" + usr.money + "🪙\n";
            }
            else if(count == 2)
            {
                topContent+="🥈 " + usr.name + "----------" + usr.money + "🪙\n";

            }
            else if(count == 3)
            {
                topContent+="🥉 " + usr.name + "----------" + usr.money + "🪙\n";
            }
            else
            {
                topContent+=count + " " + usr.name + "----------" + usr.money + "🪙\n";
            }
            count++;
        }
        topEmbed = new EmbedBuilder()
        .setColor("#0000ff")
        .setTitle("Top users")
        .setDescription("Top 10 richest users in this server")
        .addFields({ 
            name: " ",
            value: topContent,
            inline: true,
        })
        interaction.reply({ embeds: [topEmbed]});
    },
};