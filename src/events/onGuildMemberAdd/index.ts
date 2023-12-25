import { DiscordAPIError, type User, type GuildMember } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import { GUILD_ID } from '../../constants/id';
import { MAINTENANCE, USER_IS_BOT } from '../../constants/messages/info';

/**
 * @description Actions registered onGuildMemberAdd
 **/
export type OnGuildMemberAddActionNames = 'onGuildMemberAddAction1';

export const onGuildMemberAddActionNames: OnGuildMemberAddActionNames[] = ['onGuildMemberAddAction1'];

export type OnGuildMemberAddOptions = DefaultEventOptions & {
	//
};

const onGuildMemberAdd = async (guildMember: GuildMember, options: OnGuildMemberAddOptions) => {
	// Determine if this event (onGuildMemberAdd) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onGuildMemberUpdate');
	if (isMaintenance) return maintenanceHandler(guildMember.user);
	if (guildMember.user.bot) return userIsBotHandler();

	// Execute the Action set in onGuildMemberAdd
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

function maintenanceHandler(user: User) {
	const guild = user.client.guilds.cache.get(GUILD_ID) || null;
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onGuildMemberAdd').en, {
		event: 'onGuildMemberAdd',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild },
	});
}

function userIsBotHandler() {
	Logger.info(USER_IS_BOT.title.en, USER_IS_BOT.message.en, {
		event: 'onGuildMemberAdd',
		func: 'userIsBotHandler',
	});
}

export default onGuildMemberAdd;
