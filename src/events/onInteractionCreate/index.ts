import { DiscordAPIError, type Interaction } from 'discord.js';
import maintenanceManager from '../../utils/maintenanceManager';
import Logger from '../../utils/logger';
import type { DefaultEventOptions } from '../..';
import onInteractions from './onInteractions';
import onButtons from './onButtons';
import onSelectMenus from './onSelectMenus';
import onModalSubmits from './onModalSubmits';
import { MAINTENANCE } from '../../constants/messages/info';

export type OnInteractionCreateActionNames = 'onInteraction' | 'onButtons' | 'onSelectMenus' | 'onModalSubmits';
export const onInteractionCreateActionNames: OnInteractionCreateActionNames[] = [
	'onInteraction',
	'onButtons',
	'onSelectMenus',
	'onModalSubmits',
];

export type OnInteractionCreateOptions = DefaultEventOptions & {
	// Add Options
};

/**
 * ------------------------------------------------------------------------------------------------------------------------------
 * @description Handles a Discord interaction event such as a slash command, button press, select menu choice, or modal submission.
 * This function acts as a primary dispatcher, delegating the interaction to the specific handler based on its type.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param interaction - The interaction event received from Discord. This can be a command, button press, select menu choice, or modal submission.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param options - Optional parameters for handling the interaction, containing additional event-specific data and configurations.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @remarks
 * The function first checks if the `onInteractionCreate` event is currently under maintenance. If it is, it calls the `maintenanceHandler` to handle the interaction appropriately.
 * If not under maintenance, it then determines the type of the interaction (command, button, select menu, or modal) and forwards it to the respective handler function.
 * If an error occurs during the handling of the interaction, particularly a `DiscordAPIError` or a general `Error`, it is caught and handled within this function.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @example
 * ```typescript
 * client.on('interactionCreate', async (interaction) => {
 *   await onInteractionCreate(interaction, { ...options });
 * });
 * ```
 * ------------------------------------------------------------------------------------------------------------------------------
 */
const onInteractionCreate = async (interaction: Interaction, options: OnInteractionCreateOptions) => {
	// Determine if this event (onInteractionCreate) should be executed
	const isMaintenance = maintenanceManager.isEventInMaintenance('onInteractionCreate');
	if (isMaintenance) return maintenanceHandler(interaction);

	// Execute the specified command
	try {
		if (interaction.isCommand()) return await onInteractions(interaction, options);
		if (interaction.isButton()) return await onButtons(interaction, options);
		if (interaction.isSelectMenu()) return await onSelectMenus(interaction, options);
		if (interaction.isModalSubmit()) return await onModalSubmits(interaction, options);
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
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onInteractionCreate').en, {
		user: interaction.user,
		event: 'onInteractionCreate',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild: interaction.guild },
	});
}

export default onInteractionCreate;
