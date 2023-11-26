import { DiscordAPIError, type GuildMember } from 'discord.js';

/**
 * @description Actions registered onGuildMemberAdd
 **/
export type OnGuildMemberAddActionNames = 'onGuildMemberAddAction1';

export type OnGuildMemberAddOptions = {
	//
};

const onGuildMemberAdd = async (guildMember: GuildMember, options?: OnGuildMemberAddOptions) => {
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

export default onGuildMemberAdd;
