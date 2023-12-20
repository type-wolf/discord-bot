import type { EventNames } from '..';
import type { EventActions } from '../utils/maintenanceManager';

export type ByLanguageMessage = {
	en: string;
	ja: string;
};

export const MAINTENANCE = {
	title: {
		en: 'Under Maintenance',
		ja: 'メンテナンス中',
	},
	/**
	 * ------------------------------------------------------------------------------------
	 * @method toMessage
	 * ------------------------------------------------------------------------------------
	 * @description Generates a maintenance message based on the specified event and action.
	 * ------------------------------------------------------------------------------------
	 * @template E - An event name that extends from the defined `EventNames`.
	 * ------------------------------------------------------------------------------------
	 * @template A - An action name that extends from the keys of `EventActions[E]`.
	 * ------------------------------------------------------------------------------------
	 * @param {E} event - The event name.
	 * ------------------------------------------------------------------------------------
	 * @param {A} [action] - Optional action related to the event.
	 * ------------------------------------------------------------------------------------
	 * @returns {Object} An object containing the maintenance message in both English and Japanese.
	 * ------------------------------------------------------------------------------------
	 * If both an event and an action are provided, a message indicating that the action for the specified event is under maintenance is returned.
	 * If only an event is provided, a message indicating that the event itself is under maintenance is returned.
	 * ------------------------------------------------------------------------------------
	 * The returned object has two properties: `en` for the English message and `ja` for the Japanese message.
	 * ------------------------------------------------------------------------------------
	 * Example: `toMessage('event1', 'action1')` will return a message indicating that 'action1' for 'event1' is under maintenance.
	 * ------------------------------------------------------------------------------------
	 */
	toMessage: <E extends EventNames, A extends keyof EventActions[E]>(event: E, action?: A) => {
		// When events and actions are set
		if (event && action) {
			return {
				en: `The "${action.toString()}" set for the "${event}" are currently under maintenance`,
				ja: `"${event}"に設定されている"${action.toString()}"は現在メンテナンス中です`,
			};
		}
		// If set only with the event
		return {
			en: `The "${event}" is currently under maintenance`,
			ja: `"${event}"は現在メンテナンス中です`,
		};
	},
} as const;

export const USER_IS_BOT = {
	title: {
		en: 'User is a Bot',
		ja: 'ユーザがBotです',
	},
	message: {
		en: `The user who fired the event was a Bot, so the process was aborted`,
		ja: `イベントを発生させたユーザがBotだったので処理を中止しました`,
	},
} as const;

export default {
	MAINTENANCE,
	USER_IS_BOT
};
