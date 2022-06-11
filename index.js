const { Client, Intents } = require('discord.js');
const {DisTube} = require("distube");
const path = require("path");
const { join } = require('node:path');
require('dotenv').config()
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
const distube = new DisTube(client, {
    leaveOnFinish: true
});
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer ,createAudioResource, AudioPlayerStatus    } = require('@discordjs/voice');

client.once('ready', () => {
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }else if(commandName === "play"){
        if(interaction.member.voice.channel !== null){
            if(interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply(`Bpilt is in ${interaction.guild.me.voice.channel}`);
            distube.play(interaction.member.voice.channel, interaction.options._hoistedOptions[0].value,);
            const queue = distube.getQueue(interaction.member.voice.channel)
            distube.on("playSong", (queue, song) => interaction.channel.send(
                `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
            ));
            await interaction.reply("Added song to queue! :notes:")

        }else{
            await interaction.reply("Join a VC to start playing videos! :grinning:");
        }
    }else if(commandName === "stop"){
        distube.stop(interaction.member.voice.channel);
        await interaction.reply(`Bpilt left VC ${interaction.member.voice.channel}`);

    }else if(commandName === "about") await interaction.reply("Bpilt is a bot created by furnit_#5241 due to a challenge between him and his dumb friends, he also plays music and might go to court due to copyright reasons. Bpilt is under heavy development and this is a BETA version of Bpilt so there might be some bugs. If you have any suggestions please send it to Furnit_#5241 on discord and I'll never read them. -Furnit");
    else if(commandName === "pause"){
        if(interaction.member.voice.channel !== null){
            const queue = distube.getQueue(interaction.member.voice.channel)
            if(!queue) return await interaction.reply("You need to create a queue to use this feature.");
            queue.pause(interaction.member.voice.channel)
            await interaction.reply("⏸️Queue has been paused!");
        }else{
            await interaction.reply("You need to join a VC to use this feature.")
        }
    }else if(commandName === "resume"){
        if(interaction.member.voice.channel !== null){
            const queue = distube.getQueue(interaction.member.voice.channel)
            if(!queue) return await interaction.reply("You need to create a queue to use this feature.");
            queue.resume(interaction.member.voice.channel);
            await interaction.reply("▶️Queue has been resumed!");
        }
        else{
            await interaction.reply("You need to join a VC to use this feature.")
        }
    }else if(commandName === "skip"){
        if(interaction.member.voice.channel !== null){
            const queue = distube.getQueue(interaction.member.voice.channel)
            if(!queue) return await interaction.reply("You need to create a queue to use this feature.");
            queue.skip(interaction.member.voice.channel);
            await interaction.reply("⏭️Song has been skipped!");
        }else{
            await interaction.reply("You need to join a VC to use this feature.")
        }
    }else if(commandName === "volume"){
        if(interaction.member.voice.channel !== null){
            const Volume = interaction.options._hoistedOptions[0].value
            if(Volume > 100 || Volume < 1) return await interaction.replay("You have to specify a number between 1 and 100")
            distube.setVolume(interaction.member.voice.channel,Volume);
            interaction.reply(`Volume has been set to ${Volume} `)
        }else{
            await interaction.reply("You need to join a VC to use this feature.")
        }
    }
});

client.login(process.env.TOKEN);