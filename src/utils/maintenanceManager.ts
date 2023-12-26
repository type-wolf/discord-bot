import type { EventNames } from '../constants/eventName';
import { onReadyActionNames, type OnReadyActionNames } from '../events/onReady';
import { onInteractionCreateActionNames, type OnInteractionCreateActionNames } from '../events/onInteractionCreate';
import { onInteractionActionNames, type OnInteractionActionNames } from '../events/onInteractionCreate/onInteractions';
import { onButtonActionNames, type OnButtonActionNames } from '../events/onInteractionCreate/onButtons';
import { onSelectMenuActionNames, type OnSelectMenuActionNames } from '../events/onInteractionCreate/onSelectMenus';
import { onModalSubmitActionNames, type OnModalSubmitActionNames } from '../events/onInteractionCreate/onModalSubmits';
import { onGuildMemberAddActionNames, type OnGuildMemberAddActionNames } from '../events/onGuildMemberAdd';
import { onMessageCreateActionNames, type OnMessageCreateActionNames } from '../events/onMessageCreate';
import { onMessageDeleteActionNames, type OnMessageDeleteActionNames } from '../events/onMessageDelete';
import { onMessageReactionAddActionNames, type OnMessageReactionAddActionNames } from '../events/onMessageReactionAdd';
import { onMessageReactionRemoveActionNames, type OnMessageReactionRemoveActionNames } from '../events/onMessageReactionRemove';
import { onGuildMemberUpdateActionNames, type OnGuildMemberUpdateActionNames } from '../events/onGuildMemberUpdate';
import {
	onGuildScheduledEventCreateActionNames,
	type OnGuildScheduledEventCreateActionNames,
} from '../events/onGuildScheduledEventCreate';
import {
	onGuildScheduledEventUpdateActionNames,
	type OnGuildScheduledEventUpdateActionNames,
} from '../events/onGuildScheduledEventUpdate';
import {
	onGuildScheduledEventDeleteActionNames,
	type OnGuildScheduledEventDeleteActionNames,
} from '../events/onGuildScheduledEventDelete';

/**
 * ------------------------------------------------------------------------------------
 * @name ActionNames
 * ------------------------------------------------------------------------------------
 * @description Actions for all registered events.
 * ------------------------------------------------------------------------------------
 */
export type ActionNames =
	| OnReadyActionNames
	| OnInteractionCreateActionNames
	| OnInteractionActionNames
	| OnButtonActionNames
	| OnSelectMenuActionNames
	| OnModalSubmitActionNames
	| OnGuildMemberAddActionNames
	| OnGuildMemberUpdateActionNames
	| OnMessageCreateActionNames
	| OnMessageDeleteActionNames
	| OnMessageReactionAddActionNames
	| OnMessageReactionRemoveActionNames
	| OnGuildScheduledEventCreateActionNames
	| OnGuildScheduledEventUpdateActionNames
	| OnGuildScheduledEventDeleteActionNames;

/**
 * ------------------------------------------------------------------------------------
 * @name EventActions
 * ------------------------------------------------------------------------------------
 * @description Actions for registered events.
 * ------------------------------------------------------------------------------------
 */
export type EventActions = {
	onReady: Record<OnReadyActionNames, boolean>;
	onInteractionCreate: Record<OnInteractionCreateActionNames, boolean>;
	onInteractions: Record<OnInteractionActionNames, boolean>;
	onButtons: Record<OnButtonActionNames, boolean>;
	onSelectMenus: Record<OnSelectMenuActionNames, boolean>;
	onModalSubmits: Record<OnModalSubmitActionNames, boolean>;
	onGuildMemberAdd: Record<OnGuildMemberAddActionNames, boolean>;
	onGuildMemberUpdate: Record<OnGuildMemberUpdateActionNames, boolean>;
	onMessageCreate: Record<OnMessageCreateActionNames, boolean>;
	onMessageDelete: Record<OnMessageDeleteActionNames, boolean>;
	onMessageReactionAdd: Record<OnMessageReactionAddActionNames, boolean>;
	onMessageReactionRemove: Record<OnMessageReactionRemoveActionNames, boolean>;
	onGuildScheduledEventCreate: Record<OnGuildScheduledEventCreateActionNames, boolean>;
	onGuildScheduledEventUpdate: Record<OnGuildScheduledEventUpdateActionNames, boolean>;
	onGuildScheduledEventDelete: Record<OnGuildScheduledEventDeleteActionNames, boolean>;
};

export const eventActions = {
	onReady: onReadyActionNames,
	onInteractionCreate: onInteractionCreateActionNames,
	onInteractions: onInteractionActionNames,
	onButtons: onButtonActionNames,
	onSelectMenus: onSelectMenuActionNames,
	onModalSubmits: onModalSubmitActionNames,
	onGuildMemberAdd: onGuildMemberAddActionNames,
	onGuildMemberUpdate: onGuildMemberUpdateActionNames,
	onMessageCreate: onMessageCreateActionNames,
	onMessageDelete: onMessageDeleteActionNames,
	onMessageReactionAdd: onMessageReactionAddActionNames,
	onMessageReactionRemove: onMessageReactionRemoveActionNames,
	onGuildScheduledEventCreate: onGuildScheduledEventCreateActionNames,
	onGuildScheduledEventUpdate: onGuildScheduledEventUpdateActionNames,
	onGuildScheduledEventDelete: onGuildScheduledEventDeleteActionNames,
};

/**
 * ------------------------------------------------------------------------------------
 * @name EventStatus
 * ------------------------------------------------------------------------------------
 * @description Represents the maintenance status for each event.
 * ------------------------------------------------------------------------------------
 * @template EventNames - A union type of all event names.
 * ------------------------------------------------------------------------------------
 * @property {[K in EventNames]?: boolean} - Maps each event name to a boolean indicating whether it is in maintenance mode.
 * ------------------------------------------------------------------------------------
 */
export type EventStatus = { [K in EventNames]?: boolean };

/**
 * ------------------------------------------------------------------------------------
 * @name ActionStatus
 * ------------------------------------------------------------------------------------
 * @description Represents the maintenance status for actions within each event.
 * ------------------------------------------------------------------------------------
 * @template EventNames - A union type of all event names.
 * ------------------------------------------------------------------------------------
 * @template EventActions - An object mapping each event name to its associated actions.
 * ------------------------------------------------------------------------------------
 * @property {[E in EventNames]?: {[A in keyof EventActions[E]]?: boolean}} - Maps each event name to an object that maps each action of that event to a boolean indicating whether it is in maintenance mode.
 * ------------------------------------------------------------------------------------
 */
export type ActionStatus = {
	[E in EventNames]?: {
		[A in keyof EventActions[E]]?: boolean;
	};
};

/**
 * ------------------------------------------------------------------------------------
 * @name MaintenanceManager
 * ------------------------------------------------------------------------------------
 * @description Manages maintenance status of events and actions.
 * ------------------------------------------------------------------------------------
 */
class MaintenanceManager {
	/**
	 * ------------------------------------------------------------------------------------
	 * @description Stores the maintenance status of each event.
	 * ------------------------------------------------------------------------------------
	 */
	private eventStatus: EventStatus = {};

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Stores the maintenance status for actions within each event.
	 * ------------------------------------------------------------------------------------
	 */
	private actionStatus: ActionStatus = {};

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Constructor to initialize the MaintenanceManager.
	 * ------------------------------------------------------------------------------------
	 */
	constructor() {
		this.eventStatus = {} as EventStatus;
		this.actionStatus = {} as ActionStatus;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Sets the maintenance status for a specific event.
	 * ------------------------------------------------------------------------------------
	 * @param {EventNames} event - The name of the event.
	 * ------------------------------------------------------------------------------------
	 * @param {boolean} status - The maintenance status to be set for the event.
	 * ------------------------------------------------------------------------------------
	 */
	public setEventMaintenance(event: EventNames, status: boolean) {
		this.eventStatus[event] = status;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Checks if a specific event is in maintenance.
	 * ------------------------------------------------------------------------------------
	 * @param {EventNames} event - The name of the event to check.
	 * ------------------------------------------------------------------------------------
	 * @returns {boolean} true if the event is in maintenance, false otherwise.
	 * ------------------------------------------------------------------------------------
	 */
	public isEventInMaintenance(event: EventNames): boolean {
		return this.eventStatus[event] ?? false;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Sets the maintenance status for a specific action within an event.
	 * ------------------------------------------------------------------------------------
	 * @param {EventNames} event - The name of the event.
	 * ------------------------------------------------------------------------------------
	 * @param {keyof EventActions[E]} action - The name of the action within the event.
	 * ------------------------------------------------------------------------------------
	 * @param {boolean} status - The maintenance status to be set for the action.
	 * ------------------------------------------------------------------------------------
	 */
	public setActionMaintenance<E extends EventNames, A extends keyof EventActions[E]>(event: E, action: A, status: boolean) {
		if (!this.actionStatus[event]) {
			this.actionStatus[event] = {} as EventActions[E];
		}

		// Note: Typescript raises an error here, but it is handled with type assertion.
		// this.actionStatus[event]![action] = status;
		// this.actionStatus['onReady']!['onReadyAction1'] = status;
		(this.actionStatus[event] as Record<A, boolean>)[action] = status;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Checks if a specific action within an event is in maintenance.
	 * ------------------------------------------------------------------------------------
	 * @param {EventNames} event - The name of the event.
	 * ------------------------------------------------------------------------------------
	 * @param {keyof EventActions[E]} action - The name of the action within the event to check.
	 * ------------------------------------------------------------------------------------
	 * @returns {boolean} true if the action is in maintenance, false otherwise.
	 * ------------------------------------------------------------------------------------
	 */
	public isActionInMaintenance<E extends EventNames, A extends keyof EventActions[E]>(event: E, action: A): boolean {
		return this.actionStatus[event]?.[action] ?? false;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Retrieves the maintenance status for a list of events.
	 * ------------------------------------------------------------------------------------
	 * @param {EventNames[]} events - An array of event names to check for maintenance status.
	 * ------------------------------------------------------------------------------------
	 * @returns {Partial<Record<EventNames, boolean>>} A partial record mapping each provided event name to its maintenance status.
	 * ------------------------------------------------------------------------------------
	 */
	public getEventsMaintenanceStatus(events: EventNames[]): Partial<Record<EventNames, boolean>> {
		const statusMap: Partial<Record<EventNames, boolean>> = {};
		events.forEach((event) => {
			statusMap[event] = this.isEventInMaintenance(event);
		});
		return statusMap;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Retrieves the maintenance status for a list of actions within a specific event.
	 * ------------------------------------------------------------------------------------
	 * @template E - The event name, which must be a member of EventNames.
	 * ------------------------------------------------------------------------------------
	 * @param event - The name of the event.
	 * ------------------------------------------------------------------------------------
	 * @param actions - An array of actions within the specified event to check for maintenance status.
	 * ------------------------------------------------------------------------------------
	 * @returns A record mapping each action to its maintenance status within the specified event.
	 * ------------------------------------------------------------------------------------
	 */
	public getActionsMaintenanceStatus<E extends EventNames>(
		event: E,
		actions: Array<keyof EventActions[E]>
	): Record<keyof EventActions[E], boolean> {
		const statusMap: Record<keyof EventActions[E], boolean> = {} as Record<keyof EventActions[E], boolean>;
		actions.forEach((action) => {
			statusMap[action] = this.isActionInMaintenance(event, action);
		});
		return statusMap;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Retrieves the maintenance status for all events.
	 * ------------------------------------------------------------------------------------
	 * @returns {Record<EventNames, boolean>} A record mapping each event name to its maintenance status.
	 * ------------------------------------------------------------------------------------
	 */
	public getAllEventsMaintenanceStatus(): Record<EventNames, boolean> {
		const statusMap: Record<EventNames, boolean> = {} as Record<EventNames, boolean>;
		Object.keys(this.eventStatus).forEach((event) => {
			statusMap[event as EventNames] = this.isEventInMaintenance(event as EventNames);
		});
		return statusMap;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description  Retrieves the maintenance status for all actions within a specific event.
	 * ------------------------------------------------------------------------------------
	 * @template E - The event name, which must be a member of EventNames.
	 * ------------------------------------------------------------------------------------
	 * @param event - The name of the event.
	 * ------------------------------------------------------------------------------------
	 * @returns A record mapping each action within the specified event to its maintenance status.
	 * ------------------------------------------------------------------------------------
	 */
	public getAllActionsMaintenanceStatus<E extends EventNames>(event: E): Record<keyof EventActions[E], boolean> {
		const statusMap: Record<keyof EventActions[E], boolean> = {} as Record<keyof EventActions[E], boolean>;
		if (this.actionStatus[event]) {
			Object.keys(this.actionStatus[event] as Record<keyof EventActions[E], boolean>).forEach((action) => {
				statusMap[action as keyof EventActions[E]] = this.isActionInMaintenance(event, action as keyof EventActions[E]);
			});
		}
		return statusMap;
	}
}

const maintenanceManager = new MaintenanceManager();

export default maintenanceManager;
