import { DiscordAPIError, type User, type Message } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, MESSAGE_AUTHOR_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onMessageCreate
 **/
export type OnMessageCreateActionNames = 'onMessageCreateAction1';
export const onMessageCreateActionNames: OnMessageCreateActionNames[] = ['onMessageCreateAction1'];

export type OnMessageCreateOptions = DefaultEventOptions & {
	//
};

/**
 * ------------------------------------------
 * @name - onMessageCreateEvent
 * ------------------------------------------
 * @description - Execute when a message is sent out in the Guild in which the bot is participating
 * ------------------------------------------
 * @param - message: Message information is stored
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 *
 **/

const onMessageCreate = async (message: Message, options: OnMessageCreateOptions) => {
	// Determine if this evenonMessageCreate) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onMessageDelete');
	if (isMaintenance) return maintenanceHandler(message.author);
	if (message.author.bot) return authorIsBotHandler();
	try {
		return;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return;
		}
		if (e instanceof Error) {
			return;
		}
	}
};

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onMessageDelete').en, {
		user,
		event: 'onMessageDelete',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

function authorIsBotHandler() {
	Logger.info(MESSAGE_AUTHOR_IS_BOT.title.en, MESSAGE_AUTHOR_IS_BOT.toMessage().en, {
		event: 'onMessageCreate',
		func: 'authorIsBotHandler',
	});
}

export default onMessageCreate;
