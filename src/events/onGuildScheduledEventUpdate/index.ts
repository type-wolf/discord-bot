import { DiscordAPIError, type GuildScheduledEvent } from 'discord.js';

/**
 * @description Actions registered onGuildScheduledEventUpdate
 **/
export type OnGuildScheduledEventUpdateActionNames = 'onGuildScheduledEventUpdateAction1';

export type OnGuildScheduledEventUpdateOptions = {
	//
};

/**
 * ------------------------------------------
 * @name - onGuildScheduledEventUpdate
 * ------------------------------------------
 * @description - Runs when the content of the Guild event in which the bot is participating is updated
 * ------------------------------------------
 * @param - oldState: Receive the complete object of the event before updating
 * ------------------------------------------
 * @param - newState: Receive the complete object of the event after the update
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onGuildScheduledEventUpdate = async (
	oldState: GuildScheduledEvent,
	newState: GuildScheduledEvent,
	options?: OnGuildScheduledEventUpdateOptions
) => {
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

export default onGuildScheduledEventUpdate;
