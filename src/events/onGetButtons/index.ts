import { DiscordAPIError, type Interaction } from 'discord.js';

const onGetButtons = async (interaction: Interaction) => {
	if (!interaction.isButton()) return;
	try {
		// Pressing the Button created in Discord.js will execute here according to the custom ID set
		if (interaction.customId === '') console.log('Button Action');
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

export default onGetButtons;
