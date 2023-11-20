import { DiscordAPIError, type Interaction } from 'discord.js';
import CommandList from '../commands/_CommandList';

export type OnInteractionOptions = {
	// Add Options
};

// Execute the loaded slash command
const onInteraction = async (interaction: Interaction, options?: OnInteractionOptions) => {
	try {
		if (interaction.isCommand()) {
			for (const Command of CommandList) {
				if (interaction.commandName === Command.builder.name) {
					await Command.run(interaction, options);
					break;
				}
			}
		}
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return;
		}
		if (e instanceof Error) {
			return;
		}
	}
};

export default onInteraction;
