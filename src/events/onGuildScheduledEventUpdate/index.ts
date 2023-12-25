import { DiscordAPIError, type User, type GuildScheduledEvent } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, NO_SCHEDULE_CREATOR } from '../../constants/messages/info';

/**
 * @description Actions registered onGuildScheduledEventUpdate
 **/
export type OnGuildScheduledEventUpdateActionNames = 'onGuildScheduledEventUpdateAction1';
export const onGuildScheduledEventUpdateActionNames: OnGuildScheduledEventUpdateActionNames[] = [
	'onGuildScheduledEventUpdateAction1',
];

export type OnGuildScheduledEventUpdateOptions = DefaultEventOptions & {
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
	options: OnGuildScheduledEventUpdateOptions
) => {
	// Determine if this event (onGuildScheduledEventUpdate) should be executed
	if (!newState.creator) return notCreatorHandler(newState);
	const isMaintenance = maintenanceManager.isEventInMaintenance('onGuildScheduledEventUpdate');
	if (isMaintenance) return maintenanceHandler(newState.creator);

	// Execute the Action set in onGuildScheduledEventUpdate
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

function notCreatorHandler(newState: GuildScheduledEvent) {
	Logger.info(NO_SCHEDULE_CREATOR.title.en, NO_SCHEDULE_CREATOR.toMessage(newState.name).en, {
		event: 'onGuildScheduledEventUpdate',
		func: 'notCreatorHandler',
		sendToLogChannel: { guild: newState.guild },
	});
}

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onGuildScheduledEventUpdate').en, {
		user,
		event: 'onGuildScheduledEventUpdate',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

export default onGuildScheduledEventUpdate;
