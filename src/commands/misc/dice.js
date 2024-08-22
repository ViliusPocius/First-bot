const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder} = require("discord.js");
const { connectMonggose } = require('../../db.js');
const userSchema  = require('../../models/userSchema');
const { channel } = require("diagnostics_channel");
module.exports = {
    name: 'dice',
    description: 'Throw dice',
    deleted: false,
    options:[
        {
            name: 'bet',
            description: 'Place your bet',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        const userScheme = await userSchema.findOne({name: interaction.user.username});
        if (interaction.options.get('bet').value > 0) {
            if(!userScheme)
                {
                    const userScheme = new userSchema({
                            name: interaction.user.username,
                            money: 0,
                            timer: 0,
                        });
                    await userScheme.save();
                    if(userScheme.money >= interaction.options.get('bet').value)
                        {
                        var userDice = Math.floor(Math.random() * 6 + 1);
                        var botDice = Math.floor(Math.random() * 6 + 1);
                        if(userDice > botDice){
    
                            interaction.reply('You threw dice and got ' + userDice.toString() + '.\nBot threw dice and got ' + botDice.toString() + '.\nYou won ' + interaction.options.get('bet').value + ' money! 🪙');
                            userScheme.money+=interaction.options.get('bet').value;
                            await userScheme.save();
                        }
                        else if(userDice < botDice){
                            interaction.reply('You threw dice and got ' + userDice.toString() + '.\nBot threw dice and got ' + botDice.toString() + '.\nYou lost ' + interaction.options.get('bet').value + ' money! 🪙');
                            userScheme.money-=interaction.options.get('bet').value;
                            await userScheme.save();
                        }
                        else{
                            interaction.reply('You threw dice and got ' + userDice.toString() + '.\nBot threw dice and got ' + botDice.toString() + ".\nIt's a draw!");
                        }
                        }
                        else{
                            interaction.reply("You don't have enough money!");
                        }
                }
                else{
                    if(userScheme.money >= interaction.options.get('bet').value)
                        {
                        var userDice = Math.floor(Math.random() * 6 + 1);
                        var botDice = Math.floor(Math.random() * 6 + 1);
                        if(userDice > botDice){
                            interaction.reply('You threw dice and got ' + userDice.toString() + '\nBot threw dice and got ' + botDice.toString() + '\nYou won ' + interaction.options.get('bet').value + ' money! 🪙');
                            userScheme.money+=interaction.options.get('bet').value;
                            await userScheme.save();
                
                        }
                        else if(userDice < botDice){
                            interaction.reply('You threw dice and got ' + userDice.toString() + '\nBot threw dice and got ' + botDice.toString() + '\nYou lost ' + interaction.options.get('bet').value + ' money! 🪙');
                            userScheme.money-=interaction.options.get('bet').value;
                            await userScheme.save();
                
                        }
                        else{
                            interaction.reply('You threw dice and got ' + userDice.toString() + '\nBot threw dice and got ' + botDice.toString() + "\nIt's a draw!");
                        }
                        }
                        else{
                            interaction.reply("You don't have enough money!");
                        }
                }
        } else {
            interaction.reply("You must bet more than 0 money!");
        }
        
        },
};