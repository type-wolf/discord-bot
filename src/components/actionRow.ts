import {
	DiscordAPIError,
	MessageActionRow,
	type ModalActionRowComponent,
	type MessageButton,
	type MessageSelectMenu,
	type TextInputComponent,
} from 'discord.js';

export type MessageComponentsType = (MessageButton | MessageSelectMenu) | (MessageButton[] | MessageSelectMenu[]);

export type ModalComponentsType = TextInputComponent | TextInputComponent[];

export const addMessageActionRow = (components: MessageComponentsType) => {
	const actionRow = new MessageActionRow();
	try {
		if (Array.isArray(components)) {
			actionRow.addComponents(...components);
		} else {
			actionRow.addComponents(components);
		}
		return actionRow;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export const addModalActionRow = (components: ModalComponentsType) => {
	const actionRow = new MessageActionRow<ModalActionRowComponent>();
	try {
		if (Array.isArray(components)) {
			actionRow.addComponents(...components);
		} else {
			actionRow.addComponents(components);
		}
		return actionRow;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default {
	addMessageActionRow,
	addModalActionRow,
};
