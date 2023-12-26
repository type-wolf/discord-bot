import { type CommandInteraction, DiscordAPIError, type MessageSelectOptionData } from 'discord.js';
import type { OnInteractionOptions } from '..';
import type { EventNames } from '../../../../constants/eventName';
import Logger from '../../../../utils/logger';
import { eventActions } from '../../../../utils/maintenanceManager';
import { messageActionRow, selectMenu } from '../../../../components';
import { NO_COMPONENTS } from '../../../../constants/messages';
import { X, TIMER } from '../../../../constants/emoji';

const setState = async (interaction: CommandInteraction, options: OnInteractionOptions) => {
	const eventName = interaction.options.getString('event_name', true) as EventNames;
	await interaction.reply({ content: `Generate a list of actions registered in ${eventName}...${TIMER}`, ephemeral: true });
	const actions: MessageSelectOptionData[] = eventActions[eventName].map((action) => ({
		label: action.toString(),
		value: action.toString(),
	}));
	try {
		const msgSelectMenu = selectMenu(eventName, [...actions], { maxValues: actions.length });
		const msgActionRow = messageActionRow(msgSelectMenu);
		await interaction.editReply({ content: null, components: [msgActionRow] });
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			errorHandler(interaction, e);
			await interaction.editReply({ content: `${NO_COMPONENTS.message.en} ${X}` });
		}
	}
};

function errorHandler(interaction: CommandInteraction, e: DiscordAPIError) {
	Logger.error(e.name, e.message, {
		user: interaction.user,
		event: 'onInteractions',
		action: 'maintenance.set_state',
		func: 'setState',
		sendToLogChannel: { guild: interaction.guild },
	});
}

export default setState;
