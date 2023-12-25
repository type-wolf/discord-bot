import { Client } from 'discord.js';
import IntentOptions from './config/IntentOptions';
import validateEnv from './utils/validateEnv';
import onReady from './events/onReady/';
import onInteractionCreate from './events/onInteractionCreate';
import onMessageReactionAdd from './events/onMessageReactionAdd/';
import onMessageReactionRemove from './events/onMessageReactionRemove/';
import onMessageCreate from './events/onMessageCreate/';
import onMessageDelete from './events/onMessageDelete/';
import onGuildMemberAdd from './events/onGuildMemberAdd/';
import onGuildMemberUpdate from './events/onGuildMemberUpdate/';
import onGuildScheduledEventCreate from './events/onGuildScheduledEventCreate';
import onGuildScheduledEventUpdate from './events/onGuildScheduledEventUpdate';
import onGuildScheduledEventDelete from './events/onGuildScheduledEventDelete';

export type DefaultEventOptions = {
	BOT: Client;
};

(async () => {
	if (!validateEnv()) return;
	const BOT = new Client({ intents: IntentOptions });
	const options: DefaultEventOptions = { BOT };
	BOT.on('ready', async () => {
		await onReady(BOT, options);
	});
	BOT.on('interactionCreate', async (interaction) => {
		await onInteractionCreate(interaction, options);
	});
	BOT.on('guildMemberAdd', async (GuildMember) => {
		await onGuildMemberAdd(GuildMember, options);
	});
	BOT.on('messageCreate', async (message) => {
		await onMessageCreate(message, options);
	});
	BOT.on('messageDelete', async (message) => {
		await onMessageDelete(message, options);
	});
	BOT.on('messageReactionAdd', async (reaction, user) => {
		await onMessageReactionAdd(reaction, user, options);
	});
	BOT.on('messageReactionRemove', async (reaction, user) => {
		await onMessageReactionRemove(reaction, user, options);
	});
	BOT.on('guildMemberUpdate', async (oldMember, newMember) => {
		await onGuildMemberUpdate(oldMember, newMember, options);
	});
	BOT.on('guildScheduledEventCreate', async (guildScheduledEvent) => {
		await onGuildScheduledEventCreate(guildScheduledEvent, options);
	});
	BOT.on('guildScheduledEventUpdate', async (oldState, newState) => {
		await onGuildScheduledEventUpdate(oldState, newState, options);
	});
	BOT.on('guildScheduledEventDelete', async (guildScheduledEvent) => {
		await onGuildScheduledEventDelete(guildScheduledEvent, options);
	});
	console.log('Launch DiscordBot ✅');
	await BOT.login(process.env.BOT_TOKEN);
})();
