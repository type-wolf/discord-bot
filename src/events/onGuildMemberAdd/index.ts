import { DiscordAPIError, type GuildMember } from 'discord.js';

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
