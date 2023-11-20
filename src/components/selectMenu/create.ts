import { MessageSelectMenu, DiscordAPIError, type MessageSelectOptionData } from 'discord.js';

export type CreateSelectMenuOptions = {
	disabled?: boolean;
	maxValues?: number;
	minValues?: number;
	placeholder?: string;
};

export const createSelectMenu = (customId: string, datas: MessageSelectOptionData[], options?: CreateSelectMenuOptions) => {
	try {
		const selectMenu = new MessageSelectMenu().setCustomId(customId);
		if (options?.disabled) {
			selectMenu.setDisabled(options.disabled);
		}
		if (options?.maxValues) {
			selectMenu.setMaxValues(options.maxValues);
		}
		if (options?.minValues) {
			selectMenu.setMinValues(options.minValues);
		}
		if (datas.length !== 0) {
			selectMenu.setOptions(datas);
		}
		if (options?.placeholder) {
			selectMenu.setPlaceholder(options.placeholder);
		}
		return selectMenu;
	} catch (e: unknown) {
		if (e instanceof DiscordAPIError) {
			return;
		}
		if (e instanceof Error) {
			return;
		}
	}
};
