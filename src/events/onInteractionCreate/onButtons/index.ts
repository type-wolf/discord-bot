import { DiscordAPIError, type ButtonInteraction, type Interaction } from 'discord.js';
import maintenanceManager from '../../../utils/maintenanceManager';
import Logger from '../../../utils/logger';
import type { OnInteractionCreateOptions } from '../../onInteractionCreate';
import { MAINTENANCE } from '../../../constants/messages/info';

/**
 * @description Actions registered onGetButtons
 **/
export type OnButtonActionNames = 'onButtonAction1';
export const onButtonActionNames: OnButtonActionNames[] = ['onButtonAction1'];

export type OnButtonOptions = OnInteractionCreateOptions & {
	//
};

/**
 * ------------------------------------------------------------------------------------
 * @description Handles the 'button click' interactions in Discord. This function is invoked when a user clicks a button in a Discord message or interface.
 * ------------------------------------------------------------------------------------
 * @param interaction - The button interaction received from Discord. It contains details about the button clicked by the user.
 * ------------------------------------------------------------------------------------
 * @param options - Optional parameters and configurations specific to the onButtons event handling.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function first checks if the interaction is a button click. If not, it exits early. It then checks if the 'onButtons' event is under maintenance. If under maintenance, it delegates to the maintenanceHandler. Otherwise, it examines the `customId` of the button interaction to identify and execute the specific action associated with the button clicked. In case of any errors, particularly a DiscordAPIError or a general Error, the function handles them appropriately.
 * ------------------------------------------------------------------------------------
 */
const onButtons = async (interaction: Interaction, options: OnButtonOptions) => {
	// Determine if this event (onButtons) should be executed
	if (!interaction.isButton()) return;
	const isMaintenance = maintenanceManager.isEventInMaintenance('onButtons');
	if (isMaintenance) return maintenanceHandler(interaction);
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

function maintenanceHandler(interaction: ButtonInteraction) {
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onButtons').en, {
		user: interaction.user,
		event: 'onButtons',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild: interaction.guild },
	});
}

export default onButtons;
