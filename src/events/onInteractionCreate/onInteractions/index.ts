import { DiscordAPIError, type CommandInteraction, type Interaction } from 'discord.js';
import type { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import maintenanceManager from '../../../utils/maintenanceManager';
import Logger from '../../../utils/logger';
import type { OnInteractionCreateOptions } from '../../onInteractionCreate';
import maintenance from './maintenance';
import { MAINTENANCE } from '../../../constants/messages/info';

/**
 * @description Actions registered onInteraction
 **/
export type OnInteractionActionNames = 'maintenance.view_state' | 'maintenance.set_state';
export const onInteractionActionNames: OnInteractionActionNames[] = ['maintenance.view_state', 'maintenance.set_state'];

export type CommandProps = {
	builder: Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;
	run: (interaction: CommandInteraction, options: OnInteractionOptions) => Promise<void>;
};

export const CommandList: CommandProps[] = [
	// Add Slash Command
	maintenance,
];

export type OnInteractionOptions = OnInteractionCreateOptions & {
	// Add Options
};

/**
 * ------------------------------------------------------------------------------------
 * @description Asynchronously handles a Discord interaction, such as a slash command.
 * ------------------------------------------------------------------------------------
 * @param {Interaction} interaction - The interaction event received from Discord.
 * ------------------------------------------------------------------------------------
 * @param {OnInteractionOptions} [options] - Optional parameters for handling the interaction.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function is the primary handler for Discord interactions. It first checks if the interaction is a command.
 * If so, it then checks for maintenance status using onInteractionMaintenanceHandler. If the command is not under maintenance,
 * it iterates through the available commands in CommandList and executes the corresponding command if a match is found.
 * If an exception occurs during the command execution, specifically a DiscordAPIError or a general Error, the function handles it appropriately.
 * ------------------------------------------------------------------------------------
 */
const onInteractions = async (interaction: Interaction, options: OnInteractionOptions) => {
	// Determine if this event (onInteraction) should be executed
	const isCommand = interaction.isCommand();
	if (!isCommand) return;
	const isMaintenance = maintenanceManager.isEventInMaintenance('onInteractions');
	if (isMaintenance) return maintenanceHandler(interaction);

	// Execute the specified command
	try {
		for (const Command of CommandList) {
			if (interaction.commandName === Command.builder.name) {
				await Command.run(interaction, options);
				break;
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

function maintenanceHandler(interaction: Interaction) {
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onInteractions').en, {
		user: interaction.user,
		event: 'onInteractions',
		func: 'maintenanceHandler',
		sendToLogChannel: {
			guild: interaction.guild,
		},
	});
}

export default onInteractions;
