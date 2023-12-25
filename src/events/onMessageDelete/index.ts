import { Message, DiscordAPIError, type PartialMessage, User } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, MESSAGE_AUTHOR_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onMessageDelete
 **/
export type OnMessageDeleteActionNames = 'onMessageDeleteAction1';
export const onMessageDeleteActionNames: OnMessageDeleteActionNames[] = ['onMessageDeleteAction1'];

export type OnMessageDeleteOptions = DefaultEventOptions & {
	//
};

/**
 * ------------------------------------------
 * @name - onMessageDeleteEvent
 * ------------------------------------------
 * @description - Runs when a message is deleted in the Guild in which the bot is participating
 * ------------------------------------------
 * @param - message: Receives complete or incomplete message objects
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/
const onMessageDelete = async (message: Message | PartialMessage, options: OnMessageDeleteOptions) => {
	// Get complete user and reaction objects
	const newMessage = message instanceof Message ? message : await message.fetch();

	// Determine if this event (onMessageReactionRemove) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onMessageDelete');
	if (isMaintenance) return maintenanceHandler(newMessage.author);
	if (newMessage.author.bot) return authorIsBotHandler();

	// Execute the Action set in onMessageDelete
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
		event: 'onMessageDelete',
		func: 'authorIsBotHandler',
	});
}

export default onMessageDelete;
