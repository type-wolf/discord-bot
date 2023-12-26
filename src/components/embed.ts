import { MessageEmbed, type ColorResolvable, type EmbedFieldData } from 'discord.js';
import type { EmbedAuthorData, EmbedFooterData } from '@discordjs/builders';

export type EmbedOptions = {
	description?: string;
	color?: ColorResolvable;
	author?: EmbedAuthorData;
	footer?: EmbedFooterData;
	imageUrl?: string;
	url?: string;
	timestamp?: number | Date;
	thumbnailUrl?: string;
};

const embed = (title: string, fields: EmbedFieldData[] | EmbedFieldData[][], options?: EmbedOptions) => {
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
	if (fields.length > 0) {
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
};

export default embed;
