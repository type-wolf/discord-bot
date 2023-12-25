import { DiscordAPIError, ModalSubmitInteraction, type Interaction } from 'discord.js';
import maintenanceManager from '../../../utils/maintenanceManager';
import Logger from '../../../utils/logger';
import type { OnInteractionCreateOptions } from '../../onInteractionCreate';
import { MAINTENANCE } from '../../../constants/messages/info';

/**
 * @description Actions registered onModals
 **/
export type OnModalSubmitActionNames = 'onModalAction1';
export const onModalSubmitActionNames: OnModalSubmitActionNames[] = ['onModalAction1'];

export type OnModalSubmitOptions = OnInteractionCreateOptions & {
	//
};

/**
 * ------------------------------------------------------------------------------------
 * @description Handles the 'modal submit' interactions in Discord. This function is invoked when a user submits a modal form.
 * ------------------------------------------------------------------------------------
 * @param interaction - The modal submit interaction received from Discord. It contains details about the user's input in the modal.
 * ------------------------------------------------------------------------------------
 * @param options - Optional parameters and configurations specific to the onModalSubmits event handling.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function first verifies if the interaction is a modal submission. If not, it exits early. It then checks if the 'onModalSubmits' event is under maintenance. If under maintenance, it delegates to the maintenanceHandler. Otherwise, it checks the `customId` of the interaction to identify and execute the specific action associated with the modal submission. In case of any errors, particularly a DiscordAPIError or a general Error, the function handles them gracefully.
 * ------------------------------------------------------------------------------------
 */
const onModalSubmits = async (interaction: Interaction, options: OnModalSubmitOptions) => {
	// Determine if this event (onModalSubmits) should be executed
	if (!interaction.isModalSubmit()) return;
	const isMaintenance = maintenanceManager.isEventInMaintenance('onModalSubmits');
	if (isMaintenance) return maintenanceHandler(interaction);

	// Pressing the ModalSubmits created in Discord.js will execute here according to the custom ID set
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

function maintenanceHandler(interaction: ModalSubmitInteraction) {
	Logger.info(MAINTENANCE.title.en, MAINTENANCE.toMessage('onModalSubmits').en, {
		user: interaction.user,
		event: 'onModalSubmits',
		func: 'maintenanceHandler',
		sendToLogChannel: { guild: interaction.guild },
	});
}

export default onModalSubmits;
