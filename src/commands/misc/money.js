const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder} = require("discord.js");
const { connectMonggose } = require('../../db.js');
const userSchema  = require('../../models/userSchema');
const { callback } = require("./dice.js");
module.exports = {
    name: 'money',
    description: 'Check your money',
    deleted: false,
    callback: async (client, interaction) => {
        const userScheme = await userSchema.findOne({name: interaction.user.username});
        if(!userScheme)
            {
                const userScheme = new userSchema({
                        name: interaction.user.username,
                        money: 0,
                        timer: 0,
                    });
                    await userScheme.save();
                    interaction.reply(interaction.user.username + " you have " + userScheme.money.toString() + " money 🪙");
                    return;
                }
                interaction.reply(interaction.user.username + " you have " + userScheme.money.toString() + " money 🪙");
    }
}