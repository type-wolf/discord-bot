import type { CommandInteraction } from 'discord.js';
import type { OnInteractionOptions } from '..';
import type { EventNames } from '../../../../constants/eventName';
import { eventActions } from '../../../../utils/maintenanceManager';
import maintenanceManager from '../../../../utils/maintenanceManager';
import { conversionInlineMsg } from '../../../../utils/processingMessage';

const VIEW_MAINTENANCE_STATE = {
	title: {
		en: 'Get the maintenance status of each event...',
		ja: '各イベントのメンテナンス状態を取得します...',
	},
};

const viewState = async (interaction: CommandInteraction, options: OnInteractionOptions) => {
	const eventName = interaction.options.getString('event_name', true) as EventNames;
	await interaction.reply({ content: VIEW_MAINTENANCE_STATE.title.en, ephemeral: true });

	// Obtains the state of the Event itself
	const isEventMaintenance = maintenanceManager.isEventInMaintenance(eventName);
	const eventStateMsg = `**◆EntireEvent**\n${eventName}: ${conversionInlineMsg(isEventMaintenance ? 'true' : 'false')}`;
	const _content = `Share the maintenance status of **${eventName}**\n\n${eventStateMsg}\n\n**◆EventInActions**\n`;

	// Obtains the status of the Action registered in Event
	const content = generateActionStateMessage(_content, eventName);
	await interaction.editReply({ content });
};

export function generateActionStateMessage(_content: string, eventName: EventNames) {
	let content = _content;
	// Obtains the status of the Action registered in Event
	eventActions[eventName].forEach((action, index) => {
		const state = maintenanceManager.isActionInMaintenance(eventName, action as never);
		content += `${index + 1}. **${action}**: ${conversionInlineMsg(state ? 'true' : 'false')}\n`;
	});
	return content;
}

export default viewState;
