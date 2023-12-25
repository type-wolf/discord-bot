import { DiscordAPIError, type User, type GuildScheduledEvent } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { MAINTENANCE, NO_SCHEDULE_CREATOR } from '../../constants/messages/info';
import { GUILD_ID } from '../../constants/id';

/**
 * @description Actions registered onGuildScheduledEventDalete
 **/
export type OnGuildScheduledEventDeleteActionNames = 'onGuildScheduledEventDaleteActon1';
export const onGuildScheduledEventDeleteActionNames: OnGuildScheduledEventDeleteActionNames[] = [
	'onGuildScheduledEventDaleteActon1',
];

export type OnGuildScheduledEventDeleteOptions = DefaultEventOptions & {
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
 * @param - options: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onGuildScheduledEventDelete = async (schedule: GuildScheduledEvent, options: OnGuildScheduledEventDeleteOptions) => {
	// Determine if this event (onGuildScheduledEventDelete) should be executed
	if (!schedule.creator) return notCreatorHandler(schedule);
	const isMaintenance = maintenanceManager.isEventInMaintenance('onGuildScheduledEventUpdate');
	if (isMaintenance) return maintenanceHandler(schedule.creator);

	// Execute the Action set in onGuildScheduledEvenDelete
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
		event: 'onGuildScheduledEventDelete',
		func: 'notCreatorHandler',
		sendToLogChannel: { guild: schedule.guild },
	});
}

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onGuildScheduledEventDelete').en, {
		user,
		event: 'onGuildScheduledEventDelete',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

export default onGuildScheduledEventDelete;
