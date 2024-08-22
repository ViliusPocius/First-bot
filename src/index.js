require('dotenv').config();
const { Client, IntentsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler.js');
const blackjackCommand = require('./commands/misc/blackjack.js');

const { connectMonggose } = require('./db.js');

const btns = [
    {
      id: '1',
      label: 'Push',
    },
    {
      id: '2',
      label: 'Stand',
    },
  ];
const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
]
})
client.once('ready', () => {
    blackjackCommand.init(client);
    console.log(`Logged in as ${client.user.tag}!`);
});
    eventHandler(client);

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(message.content == "!ping"){
      const channel = await client.channels.cache.get('1270643861638742071');
      channel.send(message.author.toString() + " The Bot answered in " + (Date.now()-message.createdTimestamp) + " miliseconds!");
    }
}
)


client.login(process.env.TOKEN);