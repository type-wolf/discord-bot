import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandProps } from './_CommandList';

// Slash Command Builder
const builder: CommandProps['builder'] = new SlashCommandBuilder().setName('command_name').setDescription('command_description');

// Slash Command Action
const run: CommandProps['run'] = async (interaction, options) => {
	return;
};

// Export Slash Command Function
const command: CommandProps = { builder, run };

export default command;
