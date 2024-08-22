const { ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'Ban user in server',
    options:[
        {
            name: 'target',
            description: 'User to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'Reason why to ban',
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    deleted: false,
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply('Ban...' + client.ws.ping);
    },
};