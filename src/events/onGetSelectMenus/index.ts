import { DiscordAPIError, type Interaction } from 'discord.js';

const onGetSelectMenus = async (interaction: Interaction) => {
	if (!interaction.isSelectMenu()) return;
	try {
		if (interaction.customId === 'CustomSelectMenuId') console.log('SelectMenuAction');
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

export default onGetSelectMenus;
