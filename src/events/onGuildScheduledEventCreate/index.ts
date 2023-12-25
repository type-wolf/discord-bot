import { DiscordAPIError, type User, type GuildScheduledEvent } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { MAINTENANCE, NO_SCHEDULE_CREATOR } from '../../constants/messages/info';
import { GUILD_ID } from '../../constants/id';

/**
 * @description Actions registered onGuildScheduledEventCreate
 **/
export type OnGuildScheduledEventCreateActionNames = 'onGuildScheduledEventCreateAction1';
export const onGuildScheduledEventCreateActionNames: OnGuildScheduledEventCreateActionNames[] = [
	'onGuildScheduledEventCreateAction1',
];

export type OnGuildScheduleEventCreateOptions = DefaultEventOptions & {
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

const onGuildScheduledEventCreate = async (schedule: GuildScheduledEvent, options: OnGuildScheduleEventCreateOptions) => {
	// Determine if this event (onGuildScheduledEventCreate) should be executed
	if (!schedule.creator) return notCreatorHandler(schedule);
	const isMaintenance = maintenanceManager.isEventInMaintenance('onGuildScheduledEventCreate');
	if (isMaintenance) return maintenanceHandler(schedule.creator);

	// Execute the Action set in onGuildScheduledEvenCreate
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

function notCreatorHandler(schedule: GuildScheduledEvent) {
	Logger.info(NO_SCHEDULE_CREATOR.title.en, NO_SCHEDULE_CREATOR.toMessage(schedule.name).en, {
		event: 'onGuildScheduledEventCreate',
		func: 'notCreatorHandler',
		sendToLogChannel: { guild: schedule.guild },
	});
}

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onGuildScheduledEventCreate').en, {
		user,
		event: 'onGuildScheduledEventCreate',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

export default onGuildScheduledEventCreate;
