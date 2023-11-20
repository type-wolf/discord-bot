import { MessageEmbed, DiscordAPIError, type ColorResolvable, type EmbedFieldData } from 'discord.js';
import type { EmbedAuthorData, EmbedFooterData } from '@discordjs/builders';

export type CreateEmbedOptions = {
	description?: string;
	color?: ColorResolvable;
	author?: EmbedAuthorData;
	footer?: EmbedFooterData;
	imageUrl?: string;
	url?: string;
	timestamp?: number | Date;
	thumbnailUrl?: string;
};

const createEmbed = (title: string, fields: EmbedFieldData[] | EmbedFieldData[][], options?: CreateEmbedOptions) => {
	try {
		const embed = new MessageEmbed();
		embed.setTitle(title);
		if (options?.description) {
			embed.setDescription(options.description);
		}
		if (options?.color) {
			embed.setColor(options.color);
		} else {
			embed.setColor('RANDOM');
		}
		if (options?.author) {
			embed.setAuthor(options.author);
		}
		if (options?.imageUrl) {
			embed.setImage(options.imageUrl);
		}
		if (options?.url) {
			embed.setURL(options.url);
		}
		if (fields) {
			embed.addFields(...fields);
		}
		if (options?.footer) {
			embed.setFooter(options.footer);
		}
		if (options?.timestamp) {
			embed.setTimestamp(options.timestamp);
		}
		if (options?.thumbnailUrl) {
			embed.setThumbnail(options.thumbnailUrl);
		}
		return embed;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default createEmbed;
