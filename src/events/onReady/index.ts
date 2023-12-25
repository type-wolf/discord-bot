import { DiscordAPIError, type Client } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import addSlashCommand from './addSlashCommand';
import type { DefaultEventOptions } from '../..';
import { MAINTENANCE } from '../../constants/messages';

/**
 * Actions registered onReady
 **/
export type OnReadyActionNames = 'addSlashCommand';
export const onReadyActionNames: OnReadyActionNames[] = ['addSlashCommand'];

export type OnReadyOptions = DefaultEventOptions & {
	// Add Options
};

/**
 * ------------------------------------------------------------------------------------
 * @description Asynchronously handles the 'onReady' event for the Discord bot.
 * ------------------------------------------------------------------------------------
 * @param {Client} BOT - The Discord bot client.
 * ------------------------------------------------------------------------------------
 * @param {OnReadyOptions} [options] - Optional parameters for handling the 'onReady' event.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function is triggered when the Discord bot is ready. It first checks if the 'onReady' event is under maintenance.
 * If the event is not under maintenance, it proceeds to execute the `addSlashCommand` function to add slash commands to the bot.
 *
 * If an exception occurs, specifically a DiscordAPIError or a general Error, the function catches it and returns undefined.
 * This ensures that the bot does not crash on errors during the initialization of slash commands.
 * ------------------------------------------------------------------------------------
 */
const onReady = async (BOT: Client, options: OnReadyOptions) => {
	// Determine if this event (onReady) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onReady');
	if (isMaintenance) return maintenanceHandler(BOT);

	// Execute the Action set in onReady
	try {
		await addSlashCommand(BOT, options);
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
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onReady').en, {
		user: BOT.user ?? undefined,
		event: 'onReady',
		func: 'maintenanceHandler',
	});
}

export default onReady;
