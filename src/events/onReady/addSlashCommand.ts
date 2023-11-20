import { REST } from '@discordjs/rest';
import { DiscordAPIError, type Client } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import CommandList from '../../commands/_CommandList';

const GUILD_ID = process.env.GUILD_ID as string;

const addSlashCommand = async (BOT: Client) => {
	const clientId = BOT.user?.id as string;
	try {
		const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN as string);
		const commandData = CommandList.map((command) => command.builder.toJSON());
		const commandsPath = Routes.applicationGuildCommands(clientId || '[x] missing id', GUILD_ID);
		await rest.put(commandsPath, { body: commandData });
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default addSlashCommand;
