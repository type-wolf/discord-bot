import { TextInputComponent, DiscordAPIError, type TextInputComponentOptions } from 'discord.js';

export type TextInputOptions = {
	maxLength?: number;
	minLength?: number;
	placeholder?: string;
	required?: boolean;
	style?: TextInputComponentOptions['style'];
	value?: string;
};

const textInput = (customId: string, label: string, options?: TextInputOptions) => {
	const textInput = new TextInputComponent().setCustomId(customId).setLabel(label);
	if (options?.maxLength) {
		textInput.setMaxLength(options.maxLength);
	}
	if (options?.minLength) {
		textInput.setMinLength(options.minLength);
	}
	if (options?.placeholder) {
		textInput.setPlaceholder(options.placeholder);
	}
	if (options?.required) {
		textInput.setRequired(options.required);
	}
	if (options?.style) {
		textInput.setStyle(options.style);
	}
	if (options?.value) {
		textInput.setValue(options.value);
	}
	return textInput;
};

export default textInput;
