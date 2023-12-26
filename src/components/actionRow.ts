import {
	MessageActionRow,
	type ModalActionRowComponent,
	type MessageButton,
	type MessageSelectMenu,
	type TextInputComponent,
} from 'discord.js';

export type MessageComponents = (MessageButton | MessageSelectMenu) | (MessageButton[] | MessageSelectMenu[]);

export type ModalComponents = TextInputComponent | TextInputComponent[];

export const messageActionRow = (components: MessageComponents) => {
	const actionRow = new MessageActionRow();
	if (Array.isArray(components)) {
		actionRow.addComponents(...components);
	} else {
		actionRow.addComponents(components);
	}
	return actionRow;
};

export const modalActionRow = (components: ModalComponents) => {
	const actionRow = new MessageActionRow<ModalActionRowComponent>();
	if (Array.isArray(components)) {
		actionRow.addComponents(...components);
	} else {
		actionRow.addComponents(components);
	}
	return actionRow;
};

export default { messageActionRow, modalActionRow };
