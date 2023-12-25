import { DiscordAPIError, type User, type GuildMember, type PartialGuildMember } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, USER_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onGuildMemberUpdate
 **/
export type OnGuildMemberUpdateActionNames = 'onGuildMemberUpdateAction1';
export const onGuildMemberUpdateActionNames: OnGuildMemberUpdateActionNames[] = ['onGuildMemberUpdateAction1'];

export type OnGuildMemberUpdateOptions = DefaultEventOptions & {
	//
};

/**
 * ------------------------------------------
 * @name - onGuildMemberUpdate
 * ------------------------------------------
 * @description - Event executed when a Member of the Guild in which the Bot is participating updates his/her profile
 * ------------------------------------------
 * @param - oldState: Complete or incomplete objects of old members
 * ------------------------------------------
 * @param - newState: Objects with complete information about the new user
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/

const onGuildMemberUpdate = async (
	oldState: GuildMember | PartialGuildMember,
	newState: GuildMember,
	options: OnGuildMemberUpdateOptions
) => {
	// Determine if this event (onGuildMemberUpdate) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onGuildMemberUpdate');
	if (isMaintenance) return maintenanceHandler(newState.user);
	if (newState.user.bot) return userIsBotHandler();

	// Execute the Action set in onGuildMemberUpdate
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

function userIsBotHandler() {
	Logger.info(USER_IS_BOT.title.en, USER_IS_BOT.message.en, {
		event: 'onMessageReactionAdd',
		func: 'userIsBotHandler',
	});
}

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onGuildMemberUpdate').en, {
		event: 'onGuildMemberUpdate',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

export default onGuildMemberUpdate;
