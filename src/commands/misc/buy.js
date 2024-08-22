const { ApplicationCommandOptionType, Client, Interaction, Message, Options, EmbedBuilder, channelMention, Embed, PermissionsBitField } = require("discord.js");
const items = require('../../../shop.json');
const userSchema  = require('../../models/userSchema');

module.exports = {
    name: 'buy',
    description: 'Buy items from the shop',
    deleted: false,
    options:
    [{
        name: 'role',
        description: 'What role you want to buy?',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    callback: async (client, interaction) => {
        const userScheme = await userSchema.findOne({name: interaction.user.username});
        if (userScheme) {
        console.log(userScheme);


        var userChoice=interaction.options.get('role').value;
        for(item of items)
        {
            if(userChoice==item.pav)
            {
                if(userScheme.money<item.cost)
                {
                    interaction.reply("You don't have enough money to buy this item!");
                }
                else{
                    const hasRole = interaction.member.roles.cache.has(item.id);
                    if(!hasRole)
                    {
                    userScheme.money-=item.cost;
                    await userScheme.save();
                    console.log(interaction.user);

                    var role= interaction.guild.roles.cache.get(item.id);

                    await interaction.member.roles.add(role);
                    interaction.reply("Here is your role :)");
                    }
                    else{
                        interaction.reply("You already have that role!");

                    }
                    
                }

            }
        }
        } else {
            const userScheme = new userSchema({
                name: interaction.user.username,
                money: 0,
                timer: 0,
            });
            await userScheme.save();

        var userChoice=interaction.options.get('role').value;
        for(item of items)
        {
            if(userChoice==item.pav)
            {
                if(userScheme.money<item.cost)
                {
                    interaction.reply("You don't have enough money to buy this item!");
                }
                else{
                    const hasRole = interaction.member.roles.cache.has(item.id);
                    if(!hasRole)
                    {
                    userScheme.money-=item.cost;
                    await userScheme.save();
                    console.log(interaction.user);

                    var role= interaction.guild.roles.cache.get(item.id);

                    await interaction.member.roles.add(role);
                    interaction.reply("Here is your role :)");
                    }
                    else{
                        interaction.reply("You already have that role!");

                    }
                    
                }

            }
        }

        }
        
    },
};