import { REST } from '@discordjs/rest';
import { DiscordAPIError, type Client } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { CommandList } from '../onInteractionCreate/onInteractions/';
import maintenanceManager from '../../utils/maintenanceManager';
import type { OnReadyOptions } from '.';
import Logger from '../../utils/logger';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE } from '../../constants/messages/info';

/**
 * ------------------------------------------------------------------------------------
 * @description Asynchronously adds slash commands to the Discord bot.
 * ------------------------------------------------------------------------------------
 * @param {Client} BOT - The Discord bot client.
 * ------------------------------------------------------------------------------------
 * @param {OnReadyOptions} [options] - Optional parameters for adding slash commands.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function is responsible for registering slash commands to the Discord bot.
 * It first checks if the 'onReady' event and 'addSlashCommand' action are under maintenance.
 * If not under maintenance, it proceeds to register the commands.
 *
 * The function uses Discord's REST API to send the command data to the Discord server. It constructs the command data from the `CommandList`,
 * and then sends this data using the `rest.put` method to the appropriate Discord API endpoint.
 *
 * If an exception occurs during this process, specifically a DiscordAPIError or a general Error,
 * the function catches it and returns undefined to prevent the bot from crashing.
 * ------------------------------------------------------------------------------------
 */
const addSlashCommand = async (BOT: Client, options: OnReadyOptions) => {
	// Determine if this event (addSlashCommand) should be executed
	const isMaintenance = maintenanceManager.isActionInMaintenance('onReady', 'addSlashCommand');
	if (isMaintenance) return maintenanceHandler(BOT);
	if (!BOT.user?.id) return userIdIsUndefinedHandler(BOT);

	// Register each Command to Bot one by one
	try {
		const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN as string);
		const commandData = CommandList.map((command) => command.builder.toJSON());
		const commandsPath = Routes.applicationGuildCommands(BOT.user.id, GUILD_ID);
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

function maintenanceHandler(BOT: Client) {
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onReady', 'addSlashCommand').en, {
		user: BOT.user ?? undefined,
		event: 'onReady',
		action: 'addSlashCommand',
		func: 'maintenanceHandler',
	});
}

function userIdIsUndefinedHandler(BOT: Client) {
	Logger.info('Value is undefind', '"BOT.user.id" was undefind, so the command was not loaded', {
		user: BOT.user ?? undefined,
		event: 'onReady',
		action: 'addSlashCommand',
		func: 'userIdIsUndefindHandler',
	});
}

export default addSlashCommand;
