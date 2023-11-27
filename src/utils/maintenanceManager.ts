import { type EventNames } from '..';
import type { OnReadyActionNames } from '../events/onReady';
import type { OnInteractionActionNames } from '../commands/_CommandList';
import type { OnGetButtonsActionNames } from '../events/onGetButtons';
import type { OnGetSelectMenusActionNames } from '../events/onGetSelectMenus';
import type { OnGetModalsActionNames } from '../events/onGetModals';
import type { OnGuildMemberAddActionNames } from '../events/onGuildMemberAdd';
import type { OnMessageCreateActionNames } from '../events/onMessageCreate';
import type { OnMessageDeleteActionNames } from '../events/onMessageDelete';
import type { OnMessageReactionAddActionNames } from '../events/onMessageReactionAdd';
import type { OnMessageReactionRemoveActionNames } from '../events/onMessageReactionRemove';
import type { OnGuildMemberUpdateActionNames } from '../events/onGuildMemberUpdate';
import type { OnGuildScheduledEventCreateActionNames } from '../events/onGuildScheduledEventCreate';
import type { OnGuildScheduledEventUpdateActionNames } from '../events/onGuildScheduledEventUpdate';
import type { OnGuildScheduledEventDeleteActionNames } from '../events/onGuildScheduledEventDelete';

/**
 * @description Actions for all registered events
 **/
export type ActionNames =
	| OnReadyActionNames
	| OnInteractionActionNames
	| OnGetButtonsActionNames
	| OnGetSelectMenusActionNames
	| OnGetModalsActionNames
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
 * @description Actions for registered events
 **/
export type EventActions = {
	onReady: Record<OnReadyActionNames, boolean>;
	onInteraction: Record<OnInteractionActionNames, boolean>;
	onGetButtons: Record<OnGetButtonsActionNames, boolean>;
	onGetSelectMenus: Record<OnGetSelectMenusActionNames, boolean>;
	onGetModals: Record<OnGetModalsActionNames, boolean>;
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

/**
 * Represents the maintenance status for each event.
 * @template EventNames - A union type of all event names.
 * @property {[K in EventNames]?: boolean} - Maps each event name to a boolean indicating whether it is in maintenance mode.
 */
export type EventStatus = { [K in EventNames]?: boolean };

/**
 * Represents the maintenance status for actions within each event.
 * @template EventNames - A union type of all event names.
 * @template EventActions - An object mapping each event name to its associated actions.
 * @property {[E in EventNames]?: {[A in keyof EventActions[E]]?: boolean}} - Maps each event name to an object that maps each action of that event to a boolean indicating whether it is in maintenance mode.
 */
export type ActionStatus = {
	[E in EventNames]?: {
		[A in keyof EventActions[E]]?: boolean;
	};
};

/**
 * Manages maintenance status of events and actions.
 */
class MaintenanceManager {
	/**
	 * Stores the maintenance status of each event.
	 */
	private eventStatus: EventStatus = {};

	/**
	 * Stores the maintenance status for actions within each event.
	 */
	private actionStatus: ActionStatus = {};

	constructor() {
		this.eventStatus = {} as EventStatus;
		this.actionStatus = {} as ActionStatus;
	}

	/**
	 * Sets the maintenance status for a specific event.
	 * @param event - The name of the event.
	 * @param status - The maintenance status to be set for the event.
	 */
	public setEventMaintenance(event: EventNames, status: boolean) {
		this.eventStatus[event] = status;
	}

	/**
	 * Checks if a specific event is in maintenance.
	 * @param event - The name of the event to check.
	 * @returns true if the event is in maintenance, false otherwise.
	 */
	public isEventInMaintenance(event: EventNames): boolean {
		return this.eventStatus[event] ?? false;
	}

	/**
	 * Sets the maintenance status for a specific action within an event.
	 * @param event - The name of the event.
	 * @param action - The name of the action within the event.
	 * @param status - The maintenance status to be set for the action.
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
	 * Checks if a specific action within an event is in maintenance.
	 * @param event - The name of the event.
	 * @param action - The name of the action within the event to check.
	 * @returns true if the action is in maintenance, false otherwise.
	 */
	public isActionInMaintenance<E extends EventNames, A extends keyof EventActions[E]>(event: E, action: A): boolean {
		return this.actionStatus[event]?.[action] ?? false;
	}

	/**
	 * Retrieves the maintenance status for a list of events.
	 * @param events - An array of event names to check for maintenance status.
	 * @returns A partial record mapping each provided event name to its maintenance status.
	 */
	public getEventsMaintenanceStatus(events: EventNames[]): Partial<Record<EventNames, boolean>> {
		const statusMap: Partial<Record<EventNames, boolean>> = {};
		events.forEach((event) => {
			statusMap[event] = this.isEventInMaintenance(event);
		});
		return statusMap;
	}

	/**
	 * Retrieves the maintenance status for a list of actions within a specific event.
	 * @template E - The event name, which must be a member of EventNames.
	 * @param event - The name of the event.
	 * @param actions - An array of actions within the specified event to check for maintenance status.
	 * @returns A record mapping each action to its maintenance status within the specified event.
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
	 * Retrieves the maintenance status for all events.
	 * @returns A record mapping each event name to its maintenance status.
	 */
	public getAllEventsMaintenanceStatus(): Record<EventNames, boolean> {
		const statusMap: Record<EventNames, boolean> = {} as Record<EventNames, boolean>;
		Object.keys(this.eventStatus).forEach((event) => {
			statusMap[event as EventNames] = this.isEventInMaintenance(event as EventNames);
		});
		return statusMap;
	}

	/**
	 * Retrieves the maintenance status for all actions within a specific event.
	 * @template E - The event name, which must be a member of EventNames.
	 * @param event - The name of the event.
	 * @returns A record mapping each action within the specified event to its maintenance status.
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