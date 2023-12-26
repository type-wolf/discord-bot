import type { SelectMenuInteraction } from 'discord.js';
import type { OnSelectMenuOptions } from '.';
import type { EventNames } from '../../../constants/eventName';
import Logger from '../../../utils/logger';
import maintenanceManager from '../../../utils/maintenanceManager';
import { conversionInlineMsg } from '../../../utils/processingMessage';
import { generateActionStateMessage } from '../onInteractions/maintenance/viewState';

const setState = async (interaction: SelectMenuInteraction, options: OnSelectMenuOptions) => {
	const eventName = interaction.customId as EventNames;
	await interaction.reply({ content: `Update the status of the Actions registered in ${eventName}...`, ephemeral: true });
	interaction.values.forEach(async (action, index) => {
		const state = maintenanceManager.isActionInMaintenance(eventName, action as never);
		maintenanceManager.setActionMaintenance(eventName, action as never, !state);
		await interaction.editReply({ content: `Updating... Please wait a moment ${index + 1}/${interaction.values.length}` });
	});
	const isEventMaintenance = maintenanceManager.isEventInMaintenance(eventName);
	const eventStateMsg = `**◆EntireEvent**\n${eventName}: ${conversionInlineMsg(isEventMaintenance ? 'true' : 'false')}`;
	const _content = `Share the maintenance status of **${eventName}**\n\n${eventStateMsg}\n\n**◆EventInActions**\n`;
	const content = generateActionStateMessage(_content, eventName);
	logging(interaction, eventName);
	await interaction.editReply({ content });
};

function logging(interaction: SelectMenuInteraction, eventName: string) {
	const title = `Updated status of Actions registered in ${eventName}`;
	let message = 'Switched ';
	interaction.values.forEach((value) => (message += `${value},`));
	message += 'state';
	Logger.success(title, message, {
		user: interaction.user,
		event: 'onSelectMenus',
		action: 'setState',
	});
}

export default setState;
