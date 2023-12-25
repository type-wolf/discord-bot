import type { EventNames } from '../constants/eventName';
import type { OnReadyActionNames } from '../events/onReady';
import maintenanceManager from '../utils/maintenanceManager';

const eventNames: EventNames[] = [
	'onReady',
	'onInteractionCreate',
	'onInteractions',
	'onButtons',
	'onSelectMenus',
	'onModalSubmits',
	'onMessageCreate',
	'onMessageDelete',
	'onMessageReactionAdd',
	'onMessageReactionRemove',
	'onGuildMemberAdd',
	'onGuildMemberUpdate',
	'onGuildScheduledEventCreate',
	'onGuildScheduledEventUpdate',
	'onGuildScheduledEventDelete',
];

const onReadyActions: OnReadyActionNames[] = ['addSlashCommand'];

describe('MaintenanceManager', () => {
	describe('Initialization', () => {
		it('Maintenance status for all events should be false', () => {
			const eventsMaintenanceStatus = maintenanceManager.getAllEventsMaintenanceStatus();
			eventNames.forEach((eventName) => {
				expect(eventsMaintenanceStatus[eventName]).toBeUndefined();
			});
		});
	});
	describe('setEventMaintenance', () => {
		it('The maintenance status of the event should be switched appropriately', () => {
			maintenanceManager.setEventMaintenance('onReady', true);
			expect(maintenanceManager.isEventInMaintenance('onReady')).toBe(true);
			maintenanceManager.setEventMaintenance('onReady', false);
			expect(maintenanceManager.isEventInMaintenance('onReady')).toBe(false);
		});
	});
	describe('isEventInMaintenance', () => {
		it('', () => {
			//
		});
	});
	describe('setActionMaintenance', () => {
		it('The maintenance status of each action set in the event should be switched appropriately', () => {
			maintenanceManager.setActionMaintenance('onReady', 'addSlashCommand', true);
			expect(maintenanceManager.isActionInMaintenance('onReady', 'addSlashCommand')).toBe(true);
			maintenanceManager.setActionMaintenance('onReady', 'addSlashCommand', false);
			expect(maintenanceManager.isActionInMaintenance('onReady', 'addSlashCommand')).toBe(false);
		});
	});
	describe('isActionInMaintenance', () => {
		it('', () => {
			//
		});
	});
	describe('getActionsMaintenanceStatus', () => {
		// Set the status
		beforeEach(() => {
			maintenanceManager.setActionMaintenance('onReady', 'addSlashCommand', true);
		});

		it('Unspecified actions should not be referenced', () => {
			const onReadyActionStatus = maintenanceManager.getActionsMaintenanceStatus('onReady', []);
			expect(onReadyActionStatus.addSlashCommand).toBeUndefined();
		});

		it('Should be able to reference all specified actions', () => {
			const onReadyActionsStatus = maintenanceManager.getActionsMaintenanceStatus('onReady', ['addSlashCommand']);
			expect(onReadyActionsStatus.addSlashCommand).toBe(true);
		});
	});
	describe('getAllEventsMaintenanceStatus', () => {
		it('Should allow access to all event statuses', () => {
			const eventsStatus = maintenanceManager.getAllEventsMaintenanceStatus();
			eventNames.forEach((eventName) => {
				// onReady is a separate process since the state is set by the setActionMaintenance test
				if (eventName === 'onReady') return expect(eventsStatus[eventName]).toBe(false);
				expect(eventsStatus[eventName]).toBeUndefined();
			});
		});
	});
	describe('getAllActionsMaintenanceStatus', () => {
		it('Should have access to the status of all actions registered for the specified event', () => {
			const onReadyActionsStatus = maintenanceManager.getAllActionsMaintenanceStatus('onReady');
			onReadyActions.forEach((action) => {
				// onReady is a separate process since the state is set by the getActionsMaintenanceStatus test
				expect(onReadyActionsStatus[action]).toBe(true);
			});
		});
	});
});
