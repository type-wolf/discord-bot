import { MessageReaction, User, DiscordAPIError, type PartialMessageReaction, type PartialUser, type Client } from 'discord.js';

export type OnMessaageReactionRemoveOptions = {
	//
};

/**
 * ------------------------------------------
 * @name - onMessageReactionRemoveEvent
 * ------------------------------------------
 * @description - Executed when the bot removes a reaction that has been added to a message in a Guild in which the bot is participating.
 * ------------------------------------------
 * @param - reaction: Receives the complete or incomplete object of the reacted message
 * ------------------------------------------
 * @param - user: Receive the complete or incomplete object of the user who made the reaction
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onMessageReactionRemove = async (
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
	options?: OnMessaageReactionRemoveOptions
) => {
	if (user.bot) return;
	if (!(user instanceof User)) return;
	if (!(reaction instanceof MessageReaction)) return;
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

export default onMessageReactionRemove;
