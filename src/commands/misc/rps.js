const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder} = require("discord.js");
const { connectMonggose } = require('../../db.js');
const userSchema  = require('../../models/userSchema');
const { callback } = require("./dice.js");

rpsArr = ['Rock', 'Paper', 'Scissors'];
module.exports = {
    name: 'rps',
    description: 'Play Rock/Paper/Scissors',
    deleted: false,
    options:
    [{
        name: 'bet',
        description: 'Place your bet',
        type: ApplicationCommandOptionType.Number,
        required: true,
    },
    {
        name: 'choice',
        description: 'Choose rock paper or scissors',
        type: ApplicationCommandOptionType.String,
        choices: [
            {
                name: 'Rock',
                value: 'Rock',
            },
            {
                name: 'Paper',
                value: 'Paper',
            },
            {
                name: 'Scissors',
                value: 'Scissors',
            },
        ],
        required: true,
    }
],
    callback: async (client, interaction) => {
        const userScheme = await userSchema.findOne({name: interaction.user.username});
        if(interaction.options.get('bet').value > 0)
        {
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
                        //var userRps = Math.floor(Math.random() * 6 + 1);
                    var botRps = Math.floor(Math.random() * 3);
                    interaction.reply(botRps);
                    }
                    else{
                        interaction.reply("You don't have enough money!");
                    }
                }

                else{
                    if(userScheme.money >= interaction.options.get('bet').value)
                        {
                        var userRps = interaction.options.get('choice').value;
                        var botRps = rpsArr[Math.floor(Math.random() * 3)];
                        if(userRps=="Rock" && botRps=="Paper" || userRps=="Scissors" && botRps=="Rock" || userRps=="Paper" && botRps=="Scissors"){
                            userScheme.money-=interaction.options.get('bet').value;
                            await userScheme.save();

                            interaction.reply("You picked " + userRps + "\nBot picked " + botRps + "\nYou lost " + interaction.options.get('bet').value + " money 🪙");
                        }
                        else if(userRps==botRps)
                        {
                            interaction.reply("You picked " + userRps + "\nBot picked " + botRps + "\nIt's a draw!");
                        }
                        else{
                            userScheme.money+=interaction.options.get('bet').value;
                            await userScheme.save();

                            interaction.reply("You picked " + userRps + "\nBot picked " + botRps + "\nYou won " + interaction.options.get('bet').value + " money 🪙");
                        }
                        }
                        else{
                            interaction.reply("You don't have enough money!");
                        }
                }
        }
        else{
            interaction.reply("You must bet more than 0 money!");
        }


    }
}