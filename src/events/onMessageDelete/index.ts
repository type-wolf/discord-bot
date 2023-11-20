import { Message, DiscordAPIError, type PartialMessage } from 'discord.js';

export type OnMessageDeleteOptions = {
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
const onMessageDelete = async (message: Message | PartialMessage, options?: OnMessageDeleteOptions) => {
	if (!(message instanceof Message)) return;
	if (message.author.bot) return;
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

export default onMessageDelete;
