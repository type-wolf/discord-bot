import { DiscordAPIError, type Interaction } from 'discord.js';

/**
 * @description Actions registered onGetModals
 **/
export type OnGetModalsActionNames = 'onGetModalAction1';

const onGetModals = async (interaction: Interaction) => {
	if (!interaction.isModalSubmit()) return;
	try {
		if (interaction.customId === 'CustomModalID') console.log('Modal Action');
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

export default onGetModals;
