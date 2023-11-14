const { Client, GatewayIntentBits, Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const token = process.env.PROD_TOKEN;
const chanID = process.env.CHAN_ID;
let messageCount = 0;

bot.on('messageCreate', (message) => {
    
    if (message.channel.id === chanID) {
        messageCount++;
    }
});

bot.on('ready', async() => {
    console.log("discord bot ready");

    const channel = bot.channels.cache.get(chanID);

    if (channel) {
        channel.send("**CLOSE your DM - Scammers might use our team's nickname to trick you in DM <a:redlight:1173640554358243500> -\nNO team member will EVER send you a DM or a Friend Request - Be smart, stay safe and report us any suspicious activity <a:redlight:1173640554358243500>**");
    } else {
        console.error(`Le canal avec l'ID ${chanID} n'a pas ete trouve.`);
    }

    setInterval(async function () {
        const intervalChannel = bot.channels.cache.get(chanID);

        if (intervalChannel) {
            
            if(messageCount > 5) {
                intervalChannel.send("**CLOSE your DM - Scammers might use our team's nickname to trick you in DM <a:redlight:1173640554358243500> -\nNO team member will EVER send you a DM or a Friend Request - Be smart, stay safe and report us any suspicious activity <a:redlight:1173640554358243500>**");
                messageCount = 0;
            } else {
                console.log(messageCount, 'under 5 message posted since last time')
            }
            
        } else {
            console.error(`Le canal avec l'ID ${chanID} n'a pas ete trouve.`);
        }
    }, 0.5 * 60 * 1000)
});

bot.login(token);
