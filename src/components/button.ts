import { MessageButton, DiscordAPIError, type MessageButtonStyleResolvable, type EmojiIdentifierResolvable } from 'discord.js';

export type CreteButtonOptions = {
	url?: string;
	emoji?: string | EmojiIdentifierResolvable;
	disabled?: true | false;
};

const createButton = (customId: string, label: string, style: MessageButtonStyleResolvable, options?: CreteButtonOptions) => {
	try {
		const button = new MessageButton();
		if (customId) {
			button.setCustomId(customId);
		}
		button.setStyle(style);
		button.setLabel(label);
		if (options?.url) {
			button.setURL(options.url);
		}
		if (options?.emoji) {
			button.setEmoji(options.emoji);
		}
		if (options?.disabled) {
			button.setDisabled(options.disabled);
		}
		return button;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default createButton;
