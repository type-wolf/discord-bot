import { Modal, DiscordAPIError, type MessageActionRow, type ModalActionRowComponent } from 'discord.js';

export const createModal = (id: string, title: string, actionRow: MessageActionRow<ModalActionRowComponent>[]) => {
	try {
		const modal = new Modal();
		modal.setCustomId(id);
		modal.setTitle(title);
		modal.addComponents(...actionRow);
		return modal;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return undefined;
		}
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default createModal;
