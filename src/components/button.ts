import { MessageButton, type MessageButtonStyleResolvable, type EmojiIdentifierResolvable } from 'discord.js';

export type ButtonOptions = {
	url?: string;
	emoji?: string | EmojiIdentifierResolvable;
	disabled?: true | false;
};

const button = (customId: string, label: string, style: MessageButtonStyleResolvable, options?: ButtonOptions) => {
	const button = new MessageButton();
	button.setCustomId(customId);
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
};

export default button;
