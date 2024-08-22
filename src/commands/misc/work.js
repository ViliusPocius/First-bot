const { Client, Interaction, Message } = require("discord.js");
const { callback } = require("./dice.js");
const FileSystem = require("fs");
const data = require("../../../../../userCash.json");
const { connectMonggose } = require('../../db.js');
const userSchema  = require('../../models/userSchema');

connectMonggose();

userCash = [{
    name: data[0].name,
    cash: data[0].cash,
    timer: 0,
}];

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     * @param {Message} message
     */
    name: 'work',
    description: 'Work and get money',
    deleted: false,
    callback: async (client, interaction) => {
        var date = new Date();

        const userScheme = await userSchema.findOne({name: interaction.user.username});
        var rnd=Math.floor(Math.random() * 100 + 50);
        if(!userScheme)
        {
            const userScheme = new userSchema({
                    name: interaction.user.username,
                    money: 0,
                    timer: 0,
                });
            await userScheme.save();
            try {
                if((date.getTime()-userScheme.timer.getTime()) < 3600000)
                    {
                        var mins = (3600000 - (date.getTime()-userScheme.timer.getTime()))/60000;
                        var secs = (3600000 - (date.getTime()-userScheme.timer.getTime()))/1000;
                            if(mins>=1)
                            {
                                interaction.reply(interaction.user.username + ' you are still working!\nWait for ' + Math.floor(mins)  + ' minutes and try again!');
                            }
                            else{
                                interaction.reply(interaction.user.username + ' you are still working!\nWait for ' + secs.toFixed(0) + ' seconds and try again!');
                            }
                       
                        return;
                    }
                    else{
                        userScheme.timer=date.getTime();
                        wait_work(client, interaction, userScheme.money, rnd);
                    }
                if(userScheme)
                {
                    userScheme.money+=rnd;
                    userScheme.timer=date.getTime();
                    await userScheme.save();
                }
                else{
                    const newUser = new userSchema({
                        name: interaction.user.username,
                        money: 0,
                        timer: 0,
                      });
                      userScheme.money+=rnd;
                      await newUser.save();
                }
            } catch (error) {
                console.log("err..." + error);
            }
        }
        else{
            try {
                if((date.getTime()-userScheme.timer.getTime()) < 3600000)
                    {
                        var mins = (3600000 - (date.getTime()-userScheme.timer.getTime()))/60000;
                        var secs = (3600000 - (date.getTime()-userScheme.timer.getTime()))/1000;
                            if(mins>=1)
                            {
                                interaction.reply(interaction.user.username + ' you are still working!\nWait for ' + Math.floor(mins)  + ' minutes and try again!');
                            }
                            else{
                                interaction.reply(interaction.user.username + ' you are still working!\nWait for ' + secs.toFixed(0) + ' seconds and try again!');
                            }
                       
                        return;
                    }
                    else{
                        userScheme.timer=date.getTime();
                        wait_work(client, interaction, userScheme.money, rnd);
                    }
                if(userScheme)
                {
                    userScheme.money+=rnd;
                    userScheme.timer=date.getTime();
                    await userScheme.save();
                }
                else{
                    const newUser = new userSchema({
                        name: interaction.user.username,
                        money: 0,
                        timer: 0,
                      });
                      userScheme.money+=rnd;
                      await newUser.save();
                }
            } catch (error) {
                console.log("err..." + error);
            }
        }
        
    },
};

function wait_work(client, interaction, money, rnd){
    money += rnd;
    whoSent = interaction.user.username;
    interaction.reply(whoSent + ' you worked really hard and got ' + rnd + ' money\nNow you have ' + money + ' money 🪙');}