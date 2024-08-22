module.exports = async (client, guildid) => {
    let applicationCommands;

    if(guildid){
        const guild = await client.guilds.fetch(guildid);
        applicationCommands = guild.commands;
    }
    else{
        applicationCommands = await client.application.commands;

    }
    await applicationCommands.fetch();
    return applicationCommands;
}