import type { IntentsString } from 'discord.js';

const IntentOptions: IntentsString[] = [
	'GUILDS',
	'GUILD_MEMBERS',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS',
	'GUILD_PRESENCES',
	'GUILD_INVITES',
	'GUILD_VOICE_STATES',
	'GUILD_SCHEDULED_EVENTS',
];

export default IntentOptions;
