import { MessageSelectMenu, type MessageSelectOptionData } from 'discord.js';

export type SelectMenuOptions = {
	disabled?: boolean;
	maxValues?: number;
	minValues?: number;
	placeholder?: string;
};

const selectMenu = (customId: string, datas: MessageSelectOptionData[], options?: SelectMenuOptions) => {
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
};
export default selectMenu;
