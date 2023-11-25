import { Client } from 'discord.js';
import IntentOptions from './config/IntentOptions';
import validateEnv from './utils/validateEnv';
import onInteraction from './events/onInteraction';
import onReady from './events/onReady/';
import onGetModals from './events/onGetModals/';
import onGetButtons from './events/onGetButtons/';
import onGetSelectMenus from './events/onGetSelectMenus/';
import onMessageReactionAdd from './events/onMessageReactionAdd/';
import onMessageReactionRemove from './events/onMessageReactionRemove/';
import onMessageCreate from './events/onMessageCreate/';
import onMessageDelete from './events/onMessageDelete/';
import onGuildMemberAdd from './events/onGuildMemberAdd/';
import onGuildMemberUpdate from './events/onGuildMemberUpdate/';
import onGuildScheduledEventCreate from './events/onGuildScheduledEventCreate';
import onGuildScheduledEventUpdate from './events/onGuildScheduledEventUpdate';
import onGuildScheduledEventDelete from './events/onGuildScheduledEventDelete';

(async () => {
	if (!validateEnv()) return;
	const BOT = new Client({ intents: IntentOptions });
	BOT.on('ready', async () => await onReady(BOT));
	BOT.on('interactionCreate', async (interaction) => {
		await onInteraction(interaction);
		await onGetModals(interaction);
		await onGetButtons(interaction);
		await onGetSelectMenus(interaction);
	});
	BOT.on('guildMemberAdd', async (GuildMember) => await onGuildMemberAdd(GuildMember));
	BOT.on('messageCreate', async (message) => await onMessageCreate(message));
	BOT.on('messageDelete', async (message) => await onMessageDelete(message));
	BOT.on('messageReactionAdd', async (reaction, user) => {
		await onMessageReactionAdd(reaction, user);
	});
	BOT.on('messageReactionRemove', async (reaction, user) => {
		await onMessageReactionRemove(reaction, user);
	});
	BOT.on('guildMemberUpdate', async (oldMember, newMember) => {
		await onGuildMemberUpdate(oldMember, newMember);
	});
	BOT.on('guildScheduledEventCreate', async (guildScheduledEvent) => await onGuildScheduledEventCreate(guildScheduledEvent));
	BOT.on('guildScheduledEventUpdate', async (oldState, newState) => {
		await onGuildScheduledEventUpdate(oldState, newState);
	});
	BOT.on('guildScheduledEventDelete', async (guildScheduledEvent) => await onGuildScheduledEventDelete(guildScheduledEvent));
	console.log('Launch DiscordBot ✅');
	await BOT.login(process.env.BOT_TOKEN);
})();
