import { DiscordAPIError } from 'discord.js';
import type { Client } from 'discord.js';
import addSlashCommand from './addSlashCommand';

/**
 * @description Actions registered onReady
 **/
export type OnReadyActionNames = 'onReadyAction1';

const onReady = async (BOT: Client) => {
	try {
		await addSlashCommand(BOT);
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default onReady;
