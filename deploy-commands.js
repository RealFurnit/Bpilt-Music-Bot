const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('play').setDescription('Plays a song or a video').addStringOption(option => option.setName("song").setDescription("Choose a song to play! :notes:").setRequired(true)),
    new SlashCommandBuilder().setName('stop').setDescription('Stops playing the video'),
    new SlashCommandBuilder().setName("about").setDescription("More info about bpilt"),
    new SlashCommandBuilder().setName("pause").setDescription("Pauses current playing song in a queue!"),
    new SlashCommandBuilder().setName("resume").setDescription("Resumes current playing song in a queue!"),
    new SlashCommandBuilder().setName("skip").setDescription("Skips current playing song in a queue!"),
    new SlashCommandBuilder().setName('volume').setDescription('Sets music volume.').addIntegerOption(option => option.setName("percentage").setDescription("10 = 10%").setRequired(true)),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);