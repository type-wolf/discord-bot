import { CommandInteraction } from 'discord.js';
import type { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import type { OnInteractionOptions } from '../events/onInteraction';

import command from './sample';

/**
 * @description Actions registered onInteraction
 **/
export type OnInteractionActionNames = 'command_name';

type CommandBuilderProps = Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;

type CommandRunProps = (interaction: CommandInteraction, options?: OnInteractionOptions) => Promise<void>;

export type CommandProps = {
	builder: CommandBuilderProps;
	run: CommandRunProps;
};

// Add SlashCommand Function
const CommandList: CommandProps[] = [command];

export default CommandList;
