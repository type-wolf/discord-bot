import { MessageReaction, User, DiscordAPIError, type PartialMessageReaction, type PartialUser } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, USER_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onMessageReactionAdd
 **/
export type OnMessageReactionAddActionNames = 'onMessageReactionAddActon1';
export const onMessageReactionAddActionNames: OnMessageReactionAddActionNames[] = ['onMessageReactionAddActon1'];

export type OnMessageReactionAddOptions = DefaultEventOptions & {
	//
};

/**
 * ------------------------------------------
 * @name - onMessageReactionAddEvent
 * ------------------------------------------
 * @description - Executed when a reaction is made to a message in the Guild in which the bot is participating
 * ------------------------------------------
 * @param - reaction: Receives the complete or incomplete object of the reacted message
 * ------------------------------------------
 * @param - user: Receive the complete or incomplete object of the user who made the reaction
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onMessageReactionAdd = async (
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
	options: OnMessageReactionAddOptions
) => {
	// Determine if this event (onMessageReactionAdd) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onMessageReactionRemove');
	if (isMaintenance) return maintenanceHandler(user);
	if (user.bot) return userIsBotHandler();

	// Get complete user and reaction objects
	const newUser = user instanceof User ? user : await user.fetch();
	const newReaction = reaction instanceof MessageReaction ? reaction : await reaction.fetch();
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

function maintenanceHandler(user: User | PartialUser) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onMessageReactionRemove').en, {
		user,
		event: 'onMessageReactionAdd',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

function userIsBotHandler() {
	Logger.info(USER_IS_BOT.title.en, USER_IS_BOT.message.en, {
		event: 'onMessageReactionAdd',
		func: 'userIsBotHandler',
	});
}

export default onMessageReactionAdd;
