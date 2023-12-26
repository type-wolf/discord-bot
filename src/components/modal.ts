import { Modal, type MessageActionRow, type ModalActionRowComponent } from 'discord.js';

export const modal = (id: string, title: string, actionRow: MessageActionRow<ModalActionRowComponent>[]) => {
	const modal = new Modal();
	modal.setCustomId(id);
	modal.setTitle(title);
	modal.addComponents(...actionRow);
	return modal;
};

export default modal;
