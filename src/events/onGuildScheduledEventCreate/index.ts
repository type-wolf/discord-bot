import { DiscordAPIError, type GuildScheduledEvent } from 'discord.js';

export type OnGuildScheduleEventCreateOptions = {
	//
};

/**
 * ------------------------------------------
 * @name - onGuildScheduledEventCreate
 * ------------------------------------------
 * @description - Runs when a Guild event is created in which the bot is participating
 * ------------------------------------------
 * @param - schedule: Receive the complete object of the created schedule
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onGuildScheduledEventCreate = async (schedule: GuildScheduledEvent, options?: OnGuildScheduleEventCreateOptions) => {
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

export default onGuildScheduledEventCreate;
