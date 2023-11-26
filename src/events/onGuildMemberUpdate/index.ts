import { DiscordAPIError, type GuildMember, type PartialGuildMember } from 'discord.js';

/**
 * @description Actions registered onGuildMemberUpdate
 **/
export type OnGuildMemberUpdateActionNames = 'onGuildMemberUpdateAction1';

export type OnGuildMemberUpdateOptions = {
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
	options?: OnGuildMemberUpdateOptions
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

export default onGuildMemberUpdate;
