import { User, type PartialUser, DiscordAPIError, type PartialMessageReaction, MessageReaction } from 'discord.js';
import Logger from '../../utils/logger';
import maintenanceManager from '../../utils/maintenanceManager';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, USER_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onMessageReactionRemove
 **/
export type OnMessageReactionRemoveActionNames = 'onMessageReactionRemoveAction1';
export const onMessageReactionRemoveActionNames: OnMessageReactionRemoveActionNames[] = ['onMessageReactionRemoveAction1'];

export type OnMessaageReactionRemoveOptions = DefaultEventOptions & {
	//
};

/**
 * ------------------------------------------------------------------------------------------------------------------------------
 * @name onMessageReactionRemove
 * ------------------------------------------------------------------------------------------------------------------------------
 * @description Asynchronously handles the event where a reaction is removed from a message in a guild.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param {MessageReaction | PartialMessageReaction} reaction - The reaction object, which can be complete or partial, representing the removed reaction.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param {User | PartialUser} user - The user object, which can be complete or partial, who removed the reaction.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param {OnMessaageReactionRemoveOptions} [options] - Optional parameters for additional functionality or handling.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @Mark
 * This function is triggered when a reaction is removed from a message in a guild where the bot is active.
 * It first checks if the event is under maintenance and if the user who removed the reaction is a bot.
 * If the user is a bot, or if the reaction or user objects are incomplete (`PartialUser` or `PartialMessageReaction`), the function returns early.
 * In the try block, specific actions can be defined based on the reaction and user.
 * The function handles exceptions specifically for `DiscordAPIError` and general errors.
 * ------------------------------------------------------------------------------------------------------------------------------
 **/
const onMessageReactionRemove = async (
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
	options: OnMessaageReactionRemoveOptions
) => {
	// Determine if this event (onMessageReactionRemove) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onMessageReactionRemove');
	if (isMaintenance) return maintenanceHandler(user);
	if (user.bot) return userIsBotHandler();

	// Get complete user and reaction objects
	const newUser = user instanceof User ? user : await user.fetch();
	const newReaction = reaction instanceof MessageReaction ? reaction : await reaction.fetch();

	// Execute the Action set in onMessageReactionRemove
	try {
		// ... Add process
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

function maintenanceHandler(user: User | PartialUser) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onMessageReactionRemove').en, {
		user,
		event: 'onMessageReactionRemove',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

function userIsBotHandler() {
	Logger.info(USER_IS_BOT.title.en, USER_IS_BOT.message.en, {
		event: 'onMessageReactionRemove',
		func: 'userIsBotHandler',
	});
}

export default onMessageReactionRemove;
