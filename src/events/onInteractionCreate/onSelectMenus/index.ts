import { DiscordAPIError, type SelectMenuInteraction, type Interaction } from 'discord.js';
import maintenanceManager from '../../../utils/maintenanceManager';
import Logger from '../../../utils/logger';
import type { OnInteractionCreateOptions } from '../../onInteractionCreate';
import setState from './setState';
import eventNames, { type EventNames } from '../../../constants/eventName';
import { MAINTENANCE } from '../../../constants/messages/info';

/**
 * @description Actions registered onSelectMenus
 **/
export type OnSelectMenuActionNames = 'setState';
export const onSelectMenuActionNames: OnSelectMenuActionNames[] = ['setState'];

export type OnSelectMenuOptions = OnInteractionCreateOptions & {
	//
};

/**
 * ------------------------------------------------------------------------------------------------------------------------------
 * @description Handles the 'select menu' interactions in Discord. This function is invoked when a user interacts with a select menu.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param interaction - The select menu interaction received from Discord. It contains details about the user's selection.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @param options - Optional parameters and configurations specific to the onSelectMenus event handling.
 * ------------------------------------------------------------------------------------------------------------------------------
 * @mark
 * This function first checks if the interaction is a select menu interaction. If not, it exits early. It then checks if the 'onSelectMenus' event is under maintenance. If under maintenance, it delegates to the maintenanceHandler. Otherwise, it checks the `customId` of the interaction to determine the specific action to execute. If an error occurs, particularly a DiscordAPIError or a general Error, the function handles it gracefully.
 * ------------------------------------------------------------------------------------------------------------------------------
 */
const onSelectMenus = async (interaction: Interaction, options: OnSelectMenuOptions) => {
	// Determine if this event (onGetSeleceMenus) should be executed
	if (!interaction.isSelectMenu()) return;
	const isMaintenance = maintenanceManager.isEventInMaintenance('onSelectMenus');
	if (isMaintenance) return maintenanceHandler(interaction);

	// Execute the Action set in onSelectMenus
	try {
		if (eventNames.includes(interaction.customId as EventNames)) return await setState(interaction, options);
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

function maintenanceHandler(interaction: SelectMenuInteraction) {
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onSelectMenus').en, {
		user: interaction.user,
		event: 'onSelectMenus',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild: interaction.guild },
	});
}

export default onSelectMenus;
