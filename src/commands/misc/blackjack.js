const { ApplicationCommandOptionType, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const userSchema = require('../../models/userSchema');

const btns = [
    { id: '1', label: 'Push' },
    { id: '2', label: 'Stand' },
];

module.exports = {
    name: 'blackjack',
    description: 'Play blackjack',
    deleted: false,
    options: [
        {
            name: 'bet',
            description: 'Place your bet',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        const userScheme = await userSchema.findOne({ name: interaction.user.username });
        const userBet = interaction.options.get('bet').value;

        if (userBet > 0) {
            if (!userScheme) {
                const newUserScheme = new userSchema({
                    name: interaction.user.username,
                    money: 0,
                    timer: 0,
                });
                await newUserScheme.save();
            }

            if (userScheme && userScheme.money >= userBet) {
                const channel = await client.channels.cache.get('1270643861638742071');
                interaction.reply("Your bet: " + userBet + " 🪙");

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(btns[0].id)
                            .setLabel(btns[0].label)
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId(btns[1].id)
                            .setLabel(btns[1].label)
                            .setStyle(ButtonStyle.Danger)
                    );

                const card1 = Math.floor(Math.random() * 9 + 1);
                const card2 = Math.floor(Math.random() * 9 + 1);

                const userPush = card1 + card2;
                const botcard1 = Math.floor(Math.random() * 9 + 1);
                const botcard2 = Math.floor(Math.random() * 9 + 1);
                const botPush = botcard1 + botcard2;

                await channel.send({
                    content: `You pulled ${card1} and ${card2} (You have ${userPush})\nBot pulled ${botcard1} and ${botcard2} (Bot has ${botPush})\nDo you want to push or stand?`,
                    components: [row],
                });

                // Store game state
                client.gameStates = client.gameStates || {};
                client.gameStates[interaction.user.id] = {
                    userPush,
                    botPush,
                    userBet,
                    interaction
                };
                handleButtonInteraction(client, interaction);
            } else {
                interaction.reply("You don't have enough money!");
            }
        } else {
            interaction.reply("You must bet more than 0 money!");
        }
    },
};

const handleButtonInteraction = async (client, interaction) => {
    const userScheme = await userSchema.findOne({ name: interaction.user.username });

    if (!interaction.isButton()) return;

    const gameState = client.gameStates[interaction.user.id];
    if (!gameState) return;

    const channel = await client.channels.cache.get('1270643861638742071');
    
    let { userPush, botPush, userBet } = gameState;

    if (interaction.customId === '1') {
        const newUserPush = Math.floor(Math.random() * 9 + 1);
        userPush += newUserPush;
        const newBotPush = Math.floor(Math.random() * 9 + 1);
        botPush += newBotPush;

        await channel.send(`You pushed and got ${newUserPush} (You have ${userPush})\nBot pushed and got ${newBotPush} (Bot has ${botPush})`);
        if (userPush == 21)
        {
            if(botPush != 21)
            {
                await channel.send(`You won ${userBet} money 🪙`);
                userScheme.money+=userBet;
                await userScheme.save();
            }
            else{
                await channel.send("It's a draw!");
            }
                return;
        }
        if(botPush == 21)
        {
            if(userPush != 21)
            {
            await channel.send(`You lost ${userBet} money 🪙`);
            userScheme.money-=userBet;
            await userScheme.save();
            }
            else{
                await channel.send("It's a draw!");
            }
            return;

        }
        if (userPush > 21) {
            if (userPush > botPush) {
                await channel.send(`You lost ${userBet} money 🪙`);
                userScheme.money-=userBet;
                await userScheme.save();
            } else if (userPush < botPush) {
                await channel.send(`You won ${userBet} money 🪙`);
                userScheme.money+=userBet;
                await userScheme.save();
            } else {
                await channel.send("It's a draw!");
            }
            delete client.gameStates[interaction.user.id]; // Clear game state after finishing
        } 
        else if(botPush > 21){
            if (userPush > botPush) {
                await channel.send(`You lost ${userBet} money 🪙`);
                userScheme.money-=userBet;
                await userScheme.save();
            } else if (userPush < botPush) {
                await channel.send(`You won ${userBet} money 🪙`);
                userScheme.money+=userBet;
                await userScheme.save();
            } else {
                await channel.send("It's a draw!");
            }
        }
        else {
            gameState.userPush = userPush;
            gameState.botPush = botPush;
        }
    } else if (interaction.customId === '2') {
        await channel.send("You stood.");
        var probability = Math.floor(Math.random() * 99 + 1)
        if(probability % 2 == 0)
        {
            var botExtraPush = Math.floor(Math.random() * 9 + 1)
            botPush += botExtraPush;
            await channel.send("Bot pushed and got " + botExtraPush + " (Bot has " + botPush + ")");
        }
        else
        {
            await channel.send("Bot stood (Bot has " + botPush + ")");
        }
       
        if(botPush > 21)
        {
            await channel.send(`You won ${userBet} money 🪙`);
        }
        else{
            if (userPush < botPush) {
            await channel.send(`You lost ${userBet} money 🪙`);
            userScheme.money-=userBet;
            await userScheme.save();
        } else if (userPush > botPush) {
            await channel.send(`You won ${userBet} money 🪙`);
            userScheme.money+=userBet;
            await userScheme.save();
        } else {
            await channel.send("It's a draw!");
        }
        }
        
        delete client.gameStates[interaction.user.id]; // Clear game state after finishing
    }
};

module.exports.init = (client) => {
    client.on("interactionCreate", async (interaction) => {
        await handleButtonInteraction(client, interaction);
    });
};
