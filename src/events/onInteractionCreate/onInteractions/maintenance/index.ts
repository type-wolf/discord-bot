import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from '@discordjs/builders';
import setState from './setState';
import viewState from './viewState';
import eventNames from '../../../../constants/eventName';
import type { CommandProps } from '..';

function addSubCommandCommonOptions(command: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder {
	const choices = eventNames.map((eventName) => ({ name: eventName, value: eventName }));
	return command.addStringOption((option) =>
		option
			.setName('event_name')
			.setDescription('Name of the event registered in the bots event handler')
			.setChoices(...choices)
			.setRequired(true)
	);
}

// Slash Command Builder
const builder: CommandProps['builder'] = new SlashCommandBuilder()
	.setName('maintenance')
	.setDescription('Maintenance commands')
	.addSubcommand((subcommand) =>
		addSubCommandCommonOptions(subcommand.setName('set_state').setDescription('Set the maintenance state'))
	)
	.addSubcommand((subcommand) =>
		addSubCommandCommonOptions(subcommand.setName('view_state').setDescription('View the current maintenance state'))
	);

// Slash Command Action
const run: CommandProps['run'] = async (interaction, options) => {
	const subCommandName = interaction.options.getSubcommand();
	if (subCommandName === 'set_state') {
		await setState(interaction, options);
		return;
	}
	if (subCommandName === 'view_state') {
		await viewState(interaction, options);
		return;
	}
};

// Export Slash Command Function
const maintenance: CommandProps = { builder, run };

export default maintenance;
