import { TextInputComponent, DiscordAPIError, type TextInputComponentOptions } from 'discord.js';

type CreateTextInputOptions = {
	maxLength?: number;
	minLength?: number;
	placeholder?: string;
	required?: boolean;
	style?: TextInputComponentOptions['style'];
	value?: string;
};

const createTextInput = (customId: string, label: string, options?: CreateTextInputOptions) => {
	try {
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
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default createTextInput;
