import { MessageReaction, User, DiscordAPIError, type PartialMessageReaction, type PartialUser } from 'discord.js';

export type OnMessageReactionAddOptions = {
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
	options?: OnMessageReactionAddOptions
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

export default onMessageReactionAdd;
