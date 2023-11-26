import { DiscordAPIError, type GuildScheduledEvent } from 'discord.js';

/**
 * @description Actions registered onGuildScheduledEventDalete
 **/
export type OnGuildScheduledEventDeleteActionNames = 'onGuildScheduledEventDaleteActon1';

export type OnGuildScheduledEventDeleteOptions = {
	//
};

/**
 * ------------------------------------------
 * @name - onGuildScheduledEventDelete
 * ------------------------------------------
 * @description - Executed when an event in the Guild in which the bot is participating is deleted
 * ------------------------------------------
 * @param - schedule: Receive the complete object of the deleted schedule
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onGuildScheduledEventDelete = async (schedule: GuildScheduledEvent, options?: OnGuildScheduledEventDeleteOptions) => {
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

export default onGuildScheduledEventDelete;
