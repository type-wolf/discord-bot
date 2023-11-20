import { DiscordAPIError, type Message } from 'discord.js';

export type OnMessageCreateOptions = {
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

const onMessageCreate = async (message: Message, options?: OnMessageCreateOptions) => {
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

export default onMessageCreate;
